// import { Request, Response } from "express";
// import { Classroom } from "../models/ClassroomModel.js"; // קובץ מודל לדוגמה

// // יצירת כיתה חדשה
// export const createClass = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const newClass = await Classroom.create(req.body);
//         res.status(201).json(newClass);
//     } catch (error: any) {
//         res.status(409).json({ message: error.message });
//     }
// }

// // הבאת כל הכיתות
// export const getAllClasses = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const classes = await Classroom.find();
//         res.status(200).json(classes);
//     } catch (error) {
//         res.status(500).json({ message: "Error getting classes" });
//     }
// }

// // הבאת פרטי כיתה ותלמידיה
// export const getClassroom = async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     try {
//         const classroom = await Classroom.findById(id).populate('students'); // מניחים שיש קשר לסטודנטים
//         if (!classroom) {
//             res.status(404).json({ message: "Classroom not found" });
//             return;
//         }
//         res.status(200).json(classroom);
//     } catch (error) {
//         res.status(500).json({ message: "Error getting classroom" });
//     }
// }

// // קבלת ממוצע ציונים לכיתה
// export const getClassAverage = async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     try {
//         const classroom = await Classroom.findById(id).populate('students'); // טוען את הסטודנטים
//         if (!classroom || !classroom.students || classroom.students.length === 0) {
//             res.status(404).json({ message: "Classroom or students not found" });
//             return;
//         }

//         const totalScores = classroom.students.reduce((sum, student) => {
//             // ודא שה-grade הוא מערך ושהוא קיים
//             return sum + (student.grades?.reduce((gSum, grade) => gSum + (grade.score || 0), 0) || 0);
//         }, 0);

//         const average = totalScores / classroom.students.length || 0;

//         res.status(200).json({ average });
//     } catch (error) {
//         res.status(500).json({ message: "Error getting class average" });
//     }
// }
