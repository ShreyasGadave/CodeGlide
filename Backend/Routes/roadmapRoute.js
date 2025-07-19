import express from "express";
import { generateRoadmap } from "../Controller/roadmapControllers.js";


const router = express.Router();

router.post("/roadmap",generateRoadmap);

export default router;