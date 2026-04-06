import express from "express";
import * as userController from "../controller/user.controller.js";
import { AuthenticateToken } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/signup", userController.handleSignUp);
router.post("/login", userController.handleLogin);
router.get("/", AuthenticateToken, userController.handleGetUser);
router.put("/edit", AuthenticateToken, userController.handleEditUser);
router.get("/userinfo", AuthenticateToken, userController.userInfo);
router.get("/auth", AuthenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
