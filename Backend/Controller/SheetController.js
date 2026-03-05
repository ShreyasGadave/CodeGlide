import Sheet from "../Model/Sheet.js";
import User from "../Model/User.js";
import axios from "axios";
import Question from "../Model/Question.js";
import Notes from "../Model/Notes.js";
import fs from "fs";
import SheetMapping from "../Model/SheetMapping.js";
const handleCreateSheet = async (req, res) => {
  try {
    const payload = req.body?.data;

    if (!payload) {
      return res.status(400).json({ error: "Invalid payload structure" });
    }

    const { sheet, mappings } = payload;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    const userID = req.user.id;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔥 Generate slug
    const baseSlug = sheet.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    let slug = baseSlug;
    const exists = await Sheet.findOne({ slug });
    if (exists) {
      slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // =========================
    // 1️⃣ CREATE SHEET
    // =========================
    const newSheet = await Sheet.create({
      name: sheet.name,
      description: sheet.description,
      author: userID,
      slug,
      link: sheet.link || "",
      banner: sheet.banner || "",
      visibility: sheet.visibility || "public",
      tag: sheet.tag || [],
      session: sheet.session,
      followers: sheet.followers || 0,
      isFeaturedOnExplore: sheet.isFeaturedOnExplore || false,
      isPremium: sheet.isPremium || false,
      forkedCount: sheet.forkedCount || 0,
      config: sheet.config || {
        topicOrder: [],
        subTopicOrder: {},
        questionOrder: [],
      },

      authorDetails: {
        id: user.id,
        profileName: user.profileName,
        firstName: user.firstName,
        secondName: user.secondName,
        imageUrl: user.imageUrl,
        isAnonymous: user.isAnonymous || false,
        college: user.college || "",
        country: user.country || "",
        email: user.email,
        collegeDetails: {
          id: user.collegeDetails?.id || null,
          collegeName: user.collegeDetails?.collegeName || "",
        },
      },
    });

    // =========================
    // 2️⃣ INSERT QUESTIONS + MAPPINGS
    // =========================
    const mappingIds = [];

    for (const map of mappings) {
      let questionDoc = await Question.findOne({
        platform: map.questionId.platform,
        slug: map.questionId.slug,
      });

      // 🔥 If question not exist create it
      if (!questionDoc) {
        questionDoc = await Question.create({
          platform: map.questionId.platform,
          slug: map.questionId.slug,
          name: map.questionId.name,
          description: map.questionId.description || "",
          difficulty: map.questionId.difficulty,
          problemUrl: map.questionId.problemUrl,
          topics: map.questionId.topics || [],
          verified: map.questionId.verified || false,
          similarQuestions: map.questionId.similarQuestions || [],
        });
      }

      // 🔥 CREATE MAPPING
      const newMapping = await SheetMapping.create({
        sheetId: newSheet._id,
        questionId: questionDoc._id,
        topic: map.topic,
        subTopic: map.subTopic,
        title: map.title,
        resource: map.resource,
        session: map.session,
        isPublic: map.isPublic,
        hotness: map.hotness || 0,
        rank: map.rank || 0,
        popularSheets: map.popularSheets || [],
      });

      mappingIds.push(newMapping._id);
    }

    // =========================
    // 3️⃣ UPDATE QUESTION ORDER
    // =========================
    newSheet.config.questionOrder = mappingIds;
    await newSheet.save();

    return res.status(201).json({
      message: "Sheet + Questions + Mappings inserted successfully 🚀",
      sheetId: newSheet._id,
      mappingsInserted: mappingIds.length,
    });
  } catch (error) {
    console.error("Create Sheet Error:", error);
    return res.status(500).json({ error: "Server error. Try again later." });
  }
};

// ************************ Fetch and Add Questions ************************
const handleFetchAndAddQuestions = async (req, res) => {
  try {
    const { sheetId } = req.body;
    if (!sheetId) return res.status(400).json({ error: "Sheet ID required." });

    const sheet = await Sheet.findById(sheetId);
    if (!sheet) return res.status(404).json({ error: "Sheet not found." });

    const { data } = await axios.get(
      "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet",
    );
    const questionsData = data?.data?.questions;

    if (!Array.isArray(questionsData)) {
      return res.status(400).json({ error: "Invalid API response." });
    }

    const questionIds = [];

    for (const item of questionsData) {
      const q = item.questionId;

      let existing = await Question.findOne({ title: q.name });
      if (!existing) {
        existing = await Question.create({
          title: q.name,
          platform: q.platform,
          url: q.problemUrl,
          difficulty: q.difficulty,
          topic: item.topic,
          topicTags: q.topics,
        });
      }

      if (!sheet.questions.includes(existing._id)) {
        questionIds.push(existing._id);
      }
    }

    if (questionIds.length === 0) {
      return res.status(200).json({ message: "No new questions to add." });
    }

    sheet.questions.push(...questionIds);
    await sheet.save();

    return res.status(200).json({ message: "Questions added.", sheet });
  } catch (error) {
    console.error("Fetch/Add Questions Error:", error);
    return res.status(500).json({ error: "Server error." });
  }
};

// ************************ Follow / Unfollow Sheet ************************
const handleFollowSheet = async (req, res) => {
  try {
    const { sheetId } = req.body;
    const userId = req.user.id;

    if (!sheetId || !userId) {
      return res.status(400).json({ error: "User ID and Sheet ID required." });
    }

    const [user, sheet] = await Promise.all([
      User.findById(userId),
      Sheet.findById(sheetId),
    ]);

    if (!user || !sheet) {
      return res.status(404).json({ error: "User or Sheet not found." });
    }

    const index = user.sheets.findIndex(
      (s) => s.sheet_id.toString() === sheetId,
    );

    if (index !== -1) {
      user.sheets.splice(index, 1);
      await user.save();
      return res.status(200).json({ message: "Unfollowed the sheet.", user });
    }

    user.sheets.push({ sheet_id: sheetId, solved_questions: [] });
    await user.save();

    const { password, ...rest } = user._doc;

    return res.status(200).json({
      message: "Followed the sheet.",
      user: rest,
    });
  } catch (error) {
    console.error("Follow Sheet Error:", error);
    return res.status(500).json({ error: "Server error." });
  }
};

// ************************ Get All Sheets ************************
const handleGetAllSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find();

    // ✅ restructure data manually
    const formattedSheets = sheets.map((sheet) => ({
      sheet: {
        _id: sheet._id,
        name: sheet.name,
        description: sheet.description,
        banner: sheet.banner,
        link: sheet.link,
        visibility: sheet.visibility,
      },

      author: sheet.authorDetails,

      config: sheet.config,
    }));

    return res.status(200).json({
      success: true,
      message: "Sheet questions fetched successfully",
      error: null,
      data: {
        sheets: formattedSheets,
      },
    });
  } catch (error) {
    console.error("Get All Sheets Error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const handleGetSheetById = async (req, res) => {
  try {
    const { sheetId } = req.params;

    if (!sheetId) {
      return res.status(400).json({
        status: {
          code: 400,
          success: false,
          message: "sheetId is required",
          error: "Missing sheetId"
        }
      });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: {
          code: 401,
          success: false,
          message: "Unauthorized",
          error: "User not logged in"
        }
      });
    }

    // ✅ Get Sheet
    const sheet = await Sheet.findById(sheetId).lean();

    if (!sheet) {
      return res.status(404).json({
        status: {
          code: 404,
          success: false,
          message: "Sheet not found",
          error: "No sheet found"
        }
      });
    }

    // ✅ Get mappings
    const mappings = await SheetMapping.find({ sheetId })
      .populate("questionId")
      .lean();

    // ✅ Get user
    const user = await User.findById(userId).lean();

    const notes = await Notes.find({ user: userId }).lean();

    const noteMap = new Map(
      notes.map((note) => [note.question?.toString(), note])
    );

    const followed = user?.sheets?.find(
      (s) => s.sheet_id?.toString() === sheetId
    );

    const solvedSet = new Set(
      followed?.solved_questions?.map((q) => q.question_id.toString()) || []
    );

    // ✅ Add solved status
    const formattedMappings = mappings.map((m) => ({
      ...m,
      isSolved: solvedSet.has(m.questionId?._id?.toString()),
      noteId: noteMap.get(m.questionId?._id?.toString())?._id || null
    }));

    return res.status(200).json({
      status: {
        code: 200,
        success: true,
        message: "Sheet questions fetched successfully",
        error: null
      },
      data: {
        sheet,
        mappings: formattedMappings
      }
    });

  } catch (error) {
    console.error("Get Sheet by ID Error:", error);

    return res.status(500).json({
      status: {
        code: 500,
        success: false,
        message: "Server Error",
        error: error.message
      }
    });
  }
};
// ************************ Get Followed Sheets ************************
const handleGetFollowedSheets = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("sheets.sheet_id");

    if (!user) return res.status(404).json({ error: "User not found." });

    const followedSheets = user.sheets.map(
      ({ sheet_id, solved_questions }) => ({
        id: sheet_id._id,
        title: sheet_id.title,
        description: sheet_id.description,
        totalQuestions: sheet_id.questions.length,
        solvedQuestions: solved_questions.length,
      }),
    );

    return res.status(200).json({ success: true, data: followedSheets });
  } catch (error) {
    console.error("Get Followed Sheets Error:", error);
    return res.status(500).json({ success: false, error: "Server error." });
  }
};

const getSheetsData = async (req, res) => {
  try {
    const { sheetId } = req.params;

    console.log("🚀 API started... Fetching data");

    // ✅ Use lean() for large datasets (faster + lighter)
    const data = await Question.find().lean();

    console.log(`📦 Total records fetched: ${data.length}`);

    const filePath = "./sheetsData.json";

    console.log("📝 Writing data to JSON file...");

    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));

    console.log("✅ JSON file created successfully:", filePath);

    return res.status(200).json({
      message: "Data saved to JSON successfully",
      totalRecords: data.length,
    });
  } catch (error) {
    console.error("❌ Error writing JSON:", error);
    return res.status(500).json({ message: "Error saving JSON file" });
  }
};

export {
  getSheetsData,
  handleCreateSheet,
  handleFollowSheet,
  handleGetAllSheets,
  handleGetSheetById,
  handleGetFollowedSheets,
  handleFetchAndAddQuestions,
};
