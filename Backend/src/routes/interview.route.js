import express from "express";
import * as interviewController from "../controller/interview.controller.js";
import { AuthenticateToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/create", AuthenticateToken, interviewController.createInterview);
router.get("/get/:interviewId", AuthenticateToken, interviewController.getInterviewById);
router.get("/getUserInterviews",AuthenticateToken,interviewController.getUserInterviews);
router.post("/:interviewId/submitAns", AuthenticateToken, interviewController.storeUserAnswer);
router.post("/expression", AuthenticateToken, interviewController.handleStoreConfidence);
router.delete("/interview/:interviewId", AuthenticateToken, interviewController.deleteInterviewById);

export default router;