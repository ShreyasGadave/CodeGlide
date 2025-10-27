// 🔹 Create an Interview & Store AI-Generated Questions

import Interview from "../Model/Interview.js";
import { generateAIAnalysis } from "../utils/feedbackGenerator.js";
import { generateQuestions } from "../utils/geminiApi.js";

export const createInterview = async (req, res) => {
  try {
    // console.log("Request body:", req.body);

    // Hardcoded user ID for testing
    const userId = "64f1a2b3c4d5e6f7890abcd1"; // replace with a valid ObjectId

    const { jobRole, jobDescription, experienceLevel } = req.body;
    if (!jobRole || !jobDescription || !experienceLevel) {
      console.log("Missing fields in request body");
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Generating questions...");
    let questions;
    try {
      questions = await generateQuestions(jobRole, jobDescription, experienceLevel);
      // console.log("Questions generated:", questions);
    } catch (err) {
      console.error("Gemini API error:", err);
      return res.status(500).json({ message: "Failed to generate AI questions", error: err.message });
    }

    const formattedQuestions = questions.map(q => ({
      questionText: q.question,
      aiAnswer: q.answer,
      userAnswer: null,
      aiFeedback: null,
      score: 0
    }));

    console.log("Saving interview to DB...");
    const newInterview = new Interview({
      userId,
      jobRole,
      jobDescription,
      experienceLevel,
      questions: formattedQuestions
    });

    await newInterview.save();
    console.log("Interview saved successfully");

    res.status(201).json({
      message: "Interview created successfully",
      interviewId: newInterview._id,
      newInterview
    });
  } catch (error) {
    console.error("Create Interview error:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getInterviewById = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);
    if (!interview)
      return res.status(404).json({ message: "Interview not found" });

    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Store User Answer (Without Extra Routes)
export const storeUserAnswer = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { questionId, userAnswer } = req.body; // Frontend sends `questionId`

    const interview = await Interview.findById(interviewId);
    if (!interview)
      return res.status(404).json({ message: "Interview not found" });

    // 🔹 Find the question inside `questions[]` by `_id`
    const question = interview.questions.find(
      (q) => q._id.toString() === questionId
    );
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    // 🔹 Get the correct AI-generated answer
    const aiAnswer = question.aiAnswer;

    // 🔹 Update User Answer
    question.userAnswer = userAnswer;

    // 🔹 Generate AI Feedback & Score
    const { feedback, score } = await generateAIAnalysis(
      question.questionText,
      aiAnswer,
      userAnswer
    );

    // 🔹 Store AI Feedback & Score in MongoDB
    question.aiFeedback = feedback;
    question.score = score;

    // 🔹 Update `finalScore`
    const totalScore = interview.questions.reduce(
      (sum, q) => sum + (q.score || 0),
      0
    );
    const answeredQuestions = interview.questions.filter(
      (q) => q.userAnswer !== null
    ).length;
    interview.finalScore =
      answeredQuestions > 0 ? (totalScore / answeredQuestions).toFixed(2) : 0;

    await interview.save();
    res.json({ message: "Answer saved successfully", feedback, score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const handleStoreConfidence = async (req, res) => {
  try {
    const { confidence, eyecontact, interviewId } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview)
      return res.status(404).json({ message: "Interview not found" });

    // Update the fields
    interview.confidence = confidence;
    interview.eyecontact = eyecontact;

    // Save changes to DB
    await interview.save();

    res.json({ message: "Metrics updated successfully", interview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserInterviews = async (req, res) => {
  try {
    const userId = req.user.id; // Coming from Auth Middleware
    // console.log("userID",userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    // 🔹 Fetch all interviews of the logged-in user
    const interviews = await Interview.find({ userId }).sort({ createdAt: -1 });

    if (!interviews.length) {
      return res.status(404).json({ message: "No interviews found!" });
    }

    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteInterviewById = async (req, res) => {
    try {
      const { interviewId } = req.params;
      const userId = req.user.id;
  
      const interview = await Interview.findOneAndDelete({
        _id: interviewId,
        userId, // ensures users can only delete their own interviews
      });
  
      if (!interview) {
        return res.status(404).json({ message: "Interview not found or unauthorized" });
      }
  
      res.json({ message: "Interview deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
