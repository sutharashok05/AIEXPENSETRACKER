import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", protect, getMe);

export default authRoutes;