import express from "express";
import { AuthenticateToken } from "../middlewares/auth.middlewares.js";
import * as sheetController from "../controller/sheet.controller.js";
import * as questionController from "../controller/question.controller.js";

const router = express.Router();

router.post("/create",AuthenticateToken, sheetController.handleCreateSheet);
router.post("/fetch-and-add-questions", sheetController.handleFetchAndAddQuestions);
router.post("/follow", AuthenticateToken, sheetController.handleFollowSheet);
router.post("/question/mark-solved", AuthenticateToken, questionController.handleMarkQuestionAsSolved);
router.get("/data", AuthenticateToken, sheetController.handleGetAllSheets);
router.get("/details/:sheetId",AuthenticateToken, sheetController.handleGetSheetById);
router.get('/data/:sheetId', sheetController.getSheetsData)
router.get("/followed/list", AuthenticateToken, sheetController.handleGetFollowedSheets);
router.get("/solved", AuthenticateToken,  questionController.handleGetSolvedQuestionsByUser);

export default router;