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
exports.addGrade = void 0;
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
// הוספת ציון לסטודנט
const addGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { passportId, grade } = req.body;
    if (!passportId || !grade) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const updatedStudent = yield userModel_js_1.default.findOneAndUpdate({ passportId }, { $push: { grades: grade } }, { new: true });
        if (!updatedStudent) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding grade" });
    }
});
exports.addGrade = addGrade;
