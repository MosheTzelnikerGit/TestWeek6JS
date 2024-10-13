"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerStudent = exports.registerTeacher = void 0;
const TeacherModel_js_1 = require("../models/TeacherModel.js");
const ClassroomModel_js_1 = require("../models/ClassroomModel.js");
const StudentModel_js_1 = require("../models/StudentModel.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, className } = req.body;
        const existingTeacher = yield TeacherModel_js_1.Teacher.findOne({ email });
        if (existingTeacher) {
            res.status(400).json({ error: "Teacher already has a classroom assigned" });
            return;
        }
        const existingClassroom = yield ClassroomModel_js_1.Classroom.findOne({ name: className });
        if (existingClassroom) {
            res.status(400).json({ error: "Classroom with this name already exists" });
            return;
        }
        const newClass = new ClassroomModel_js_1.Classroom({ name: className });
        yield newClass.save();
        const newTeacher = new TeacherModel_js_1.Teacher({
            name,
            email,
            password,
            classroom: newClass._id,
        });
        yield newTeacher.save();
        newClass.teacher = newTeacher._id;
        yield newClass.save();
        res.status(201).json({ classId: newClass._id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});
exports.registerTeacher = registerTeacher;
const registerStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password, className } = req.body;
        const existingStudent = yield StudentModel_js_1.Student.findOne({ email });
        if ((existingStudent === null || existingStudent === void 0 ? void 0 : existingStudent.email) === email) {
            res.status(400).json({ error: "Student is already registered" });
            return;
        }
        const classroom = yield ClassroomModel_js_1.Classroom.findOne({ name: className });
        if (!classroom) {
            res.status(404).json({ error: "Classroom not found" });
            return;
        }
        const newStudent = new StudentModel_js_1.Student({
            name,
            email,
            password,
            classroom: classroom._id,
        });
        yield newStudent.save();
        (_a = classroom.students) === null || _a === void 0 ? void 0 : _a.push(newStudent._id);
        yield classroom.save();
        res.status(201).json({ message: "Student registered successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error || "An error occurred" });
    }
});
exports.registerStudent = registerStudent;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield StudentModel_js_1.Student.findOne({ email });
        if (!user) {
            user = yield TeacherModel_js_1.Teacher.findOne({ email });
        }
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, roll: user.roll }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { maxAge: 600000 });
        res.status(200).json({ token: token, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error || "An error occurred" });
    }
});
exports.login = login;
//   export const login = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { email, password } = req.body;
//       // חיפוש המשתמש לפי המייל
//       const user = await Teacher.findOne({ email }) || await Student.findOne({ email });
//       // אם המשתמש לא נמצא או הסיסמה לא נכונה
//       if (!user || user.password !== password) {
//         res.status(401).json({ error: "Invalid email or password" });
//         return;
//       }
//       // יצירת טוקן על פי תפקיד המשתמש
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
//       // הגדרת קוקיז
//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 3600000, // 1 שעה
//       });
//       // מתן הרשאות שונות לפי תפקיד המשתמש
//       if (user._id === "student") {
//         res.status(200).json({ message: "Login successful, you can view grades." });
//         console.log("JWT_SECRET:", process.env.JWT_SECRET);
//       } else if (user._id === "teacher") {
//         res.status(200).json({ message: "Login successful, you can manage grades." });
//         console.log("JWT_SECRET:", process.env.JWT_SECRET);
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: error || "An error occurred" });
//     }
//   };
