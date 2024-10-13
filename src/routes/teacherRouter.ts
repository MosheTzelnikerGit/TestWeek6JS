import { Router } from "express";
import { registerTeacher, getTeachers } from "../controllers/teacherController";

const teacherRouter = Router();

teacherRouter.post("/register", registerTeacher); // רישום מורה עם כיתה חדשה
teacherRouter.get("/", getTeachers); // קבלת רשימת מורים

export default teacherRouter;
