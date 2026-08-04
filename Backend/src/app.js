import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import UserRouter from "./routes/user.route.js";
import NoteRouter from "./routes/note.route.js";
import SheetRouter from "./routes/sheet.route.js";
import ProfileRouter from "./routes/Profile.route.js";
import CreateRoadmap from "./routes/roadMap.route.js";
import AIInterview from "./routes/interview.route.js";
import AnalyzeResume from "./routes/resumeAnalyze.route.js";

import { AuthenticateToken } from "./middlewares/auth.middlewares.js";
import { generateAIResponse } from "./controller/aiagent.controller.js";
import { FetchInternships } from "./controller/internship.controller.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173" || "http://localhost:5174",
    credentials: true,
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/health", (req, res) => {
  res.send("OK");
});

// Routes
app.use("/api/user", UserRouter);
app.use("/api/sheets", SheetRouter);
app.use("/api/notes", NoteRouter);
app.use("/api/profile", ProfileRouter);
app.post("/api/aiagent", AuthenticateToken, generateAIResponse);
app.use("/api/aiinterview", AIInterview);
app.use("/api/resume", AnalyzeResume);
app.get("/api/jobs", FetchInternships);
app.use("/api/create", CreateRoadmap);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
