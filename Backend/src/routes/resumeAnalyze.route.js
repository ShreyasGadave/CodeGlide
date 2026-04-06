import express from "express";
import { handleanalyzepdf } from "../controller/resumeAnalyze.controller.js";
import multer from "../middlewares/multer.middlewares.js";
import { AuthenticateToken  } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/analyze", AuthenticateToken , multer, handleanalyzepdf);

export default router;
