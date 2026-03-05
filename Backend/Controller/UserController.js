import bcrypt from "bcrypt";
import { setUser } from "../Services/Auth.js";
import User from "../Model/User.js";

import { sendVerificationOTP } from "../Services/emailService.js";

// Handle user signup
async function handleSignUp(req, res) {
  try {
    const { name, email, password, terms, mobile, username, dateOfBirth } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !terms ||
      !mobile ||
      !username ||
      !dateOfBirth
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already taken",
      });
    }
    // const otp = Math.floor(100000 + Math.random() * 900000);
    // await sendVerificationOTP(email, otp);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      dateOfBirth,
      mobile,
      email,
      password: hashedPassword,
      terms,
      emailVerification: {
        // otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
        attempts: 0,
      },
    });

    const accessToken = setUser(newUser);
    const userWithoutSensitiveData = newUser.toObject();
    delete userWithoutSensitiveData.password;
    delete userWithoutSensitiveData.sheets;

    return res
      .status(200)
      .json({ user: userWithoutSensitiveData, token: accessToken });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}

//Handle user login
async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password -sheets");

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // console.log("Password from body:", password);
    // console.log("Password from DB:", user.password);

    const accessToken = setUser(user);
    const { password: _, ...userWithoutPassword } = user._doc;

    res.cookie("token", accessToken, {
      httpOnly: true, // cannot be accessed by JS (secure)
      sameSite: "Lax", // good for localhost
      secure: false, // true only in HTTPS production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      user: userWithoutPassword,
      token: accessToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error); // log full error for debugging

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Handle fetching user data
const handleGetUser = async (req, res) => {
  const userId = req.user.id;
  console.log(req.body);

  try {
    const user = await User.findOne({ email }).select("+password -sheets");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);

    return res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
};

// Handle editing user data
async function handleEditUser(req, res) {
  try {
    const userId = req.user.id;
    const { name, platforms } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (platforms) {
      user.platforms.github = platforms.github || user.platforms.github;
      user.platforms.leetcode = platforms.leetcode || user.platforms.leetcode;
      user.platforms.codeforces =
        platforms.codeforces || user.platforms.codeforces;
    }

    await user.save();

    const { password, sheets, ...updatedUser } = user._doc;
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
}

export { handleSignUp, handleLogin, handleGetUser, handleEditUser };
