import userModel from "../models/userModel.js";
import {Teacher} from "../models/TeacherModel.js";
import e, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser, IGrade } from '../models/userModel.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { Classroom } from "../models/ClassroomModel.js";

dotenv.config();
export const registerTeacher = async (req: Request, res: Response) => {
    const teacher = req.body;
    try {
        const classroom = await Classroom.findOne({ name: teacher.classroom });
        if (!classroom) {
            const newTeacher = await Teacher.create(teacher);
            const newClassroom = await Classroom.create({ name: teacher.classroom , teacher: newTeacher._id });
            res.status(201).json(newClassroom);
        } else {
            res.status(409).json({ message: "Classroom already exists" });
        }   
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
};
 