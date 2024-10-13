import { Router } from "express";
import { registerTeacher } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", registerTeacher);

export default authRouter;
