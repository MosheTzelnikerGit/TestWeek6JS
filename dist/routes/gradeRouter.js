"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gradeController_js_1 = require("../controllers/gradeController.js");
const gradeRouter = (0, express_1.Router)();
gradeRouter.post("/:studentId", gradeController_js_1.addGrade); // הוספת ציון לתלמיד
// gradeRouter.put("/:studentId/:gradeId", updateGrade); // עדכון ציון
// gradeRouter.get("/student/:studentId", getStudentGrades); // ציונים של תלמיד
// gradeRouter.get("/class/:classId", getClassGrades); // ציונים של כיתה
exports.default = gradeRouter;
