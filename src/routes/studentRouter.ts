import { Router } from "express";
import { getStudentGrades } from "../controllers/StudentController.js";

const router = Router();

router.get("/getStudentGrades", getStudentGrades); 

export default router;
