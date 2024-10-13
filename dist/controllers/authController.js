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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTeacher = void 0;
const TeacherModel_js_1 = require("../models/TeacherModel.js");
const ClassroomModel_js_1 = require("../models/ClassroomModel.js");
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
