import express from "express";
import { registerTeacher } from "../controllers/authController.js";

const router = express.Router();

// רישום ה-Route
router.post("/register", registerTeacher);

export default router;
