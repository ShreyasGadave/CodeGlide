import express from "express";
import { GithubData } from "../controller/github.controller.js";
import { LeetcodeData } from "../controller/leetcode.controller.js";
import { codeforcesData } from "../controller/codeforces.controller.js";
import { AuthenticateToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/github",AuthenticateToken, GithubData);
router.get("/codeforces",AuthenticateToken, codeforcesData);
router.get("/leetcode",AuthenticateToken, LeetcodeData);

export default router;
