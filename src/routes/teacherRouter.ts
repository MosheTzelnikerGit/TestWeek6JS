import { Router } from "express";
import { addGrade, updateGrade, getClassGrades } from "../controllers/teacherController";

const router = Router();

router.post("/addGrade", addGrade);
router.post("/updateGrade", updateGrade);
router.get("/", getClassGrades); 

export default router;
