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
exports.addGrade = exports.getAverageAll = exports.getAllGrades = exports.getAllUsers = void 0;
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
// הבאת כל היוזרים
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "teacher") {
            res.status(403).json({ message: "Forbidden: Only teachers can access this resource." });
            return;
        }
        const users = yield userModel_js_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(404).json({ message: "Error getting all users" });
    }
});
exports.getAllUsers = getAllUsers;
// הבאת כל השמות עם הציונים שלהם
const getAllGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "teacher") {
            res.status(403).json({ message: "Forbidden: Only teachers can access this resource." });
            return;
        }
        const usersWithGrades = yield userModel_js_1.default.aggregate([
            {
                $match: {
                    role: "student"
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    grades: 1
                }
            }
        ]);
        res.status(200).json(usersWithGrades);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all grades" });
    }
});
exports.getAllGrades = getAllGrades;
// הבאת ממוצע ציוני כל הסטודנטים
const getAverageAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "teacher") {
            res.status(403).json({ message: "Forbidden: Only teachers can access this resource." });
            return;
        }
        const average = yield userModel_js_1.default.aggregate([
            {
                $match: {
                    role: "student"
                }
            },
            {
                $unwind: "$grades"
            },
            {
                $group: {
                    _id: null,
                    averageOfAll: { $avg: "$grades.score" }
                }
            },
            {
                $project: {
                    _id: 0,
                    averageOfAll: 1
                }
            }
        ]);
        res.status(200).json(average);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all grades" });
    }
});
exports.getAverageAll = getAverageAll;
// הוספת ציון לסטודנט
const addGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "teacher") {
            res.status(403).json({ message: "Forbidden: Only teachers can access this resource." });
            return;
        }
        const { passportId, grade } = req.body;
        if (!passportId || !grade) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const updatedGrade = yield userModel_js_1.default.findOneAndUpdate({ passportId }, { $push: { grades: Object.assign({}, grade) } }, { new: true });
        if (!updatedGrade) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(grade);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding grade" });
    }
});
exports.addGrade = addGrade;
