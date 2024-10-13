import { Router } from "express";
import {
  addGrade,
//   updateGrade,
//   getStudentGrades,
//   getClassGrades,
} from "../controllers/gradeController.js";

const gradeRouter = Router();

gradeRouter.post("/:studentId", addGrade); // הוספת ציון לתלמיד
// gradeRouter.put("/:studentId/:gradeId", updateGrade); // עדכון ציון
// gradeRouter.get("/student/:studentId", getStudentGrades); // ציונים של תלמיד
// gradeRouter.get("/class/:classId", getClassGrades); // ציונים של כיתה

export default gradeRouter;
