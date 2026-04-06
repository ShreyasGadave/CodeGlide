import express from "express";
import * as NotesController from "../controller/notes.controller.js";
import { AuthenticateToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/create", AuthenticateToken, NotesController.createNote);
router.put("/update", AuthenticateToken, NotesController.handleUpdateNotes);
router.get("/general", AuthenticateToken, NotesController.getUserNotes);
router.get("/question", AuthenticateToken, NotesController.getUserQuestionNotes);
router.get("/:noteId", AuthenticateToken, NotesController.handleGetNoteById);
router.delete("/:noteId", AuthenticateToken, NotesController.handleDeleteNote);

export default router;
