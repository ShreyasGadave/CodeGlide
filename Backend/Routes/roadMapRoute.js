import express from "express";
import { generateRoadmap } from "../Controller/roadMapController.js"


const router = express.Router();

router.post("/roadmap",generateRoadmap);

export default router;