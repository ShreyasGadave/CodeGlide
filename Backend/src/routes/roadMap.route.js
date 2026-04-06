import express from "express";
import { Roadmap } from "../controller/roadmap.controller.js";

const router = express.Router();

router.post("/roadmap", Roadmap);

export default router;
