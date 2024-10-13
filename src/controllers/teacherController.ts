import userModel from "../models/userModel.js";
import { Request, Response } from "express";
import { errorHandler } from '../middleware/errorHandler.js';

interface UserRequest extends Request {
    user?: {
        role: string;
    };
}

// הבאת כל היוזרים
export const getAllUsers = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        if (req.user?.role !== "teacher") {
            res.status(403).json({ message: "Forbidden: Only teachers can access this resource." });
            return;
        }

        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: "Error getting all users" });
    }
}

// הבאת כל השמות עם הציונים שלהם
export const getAllGrades = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        if (req.user?.role !== "teacher") {
            res.status(403).json({ message: "Forbidden: Only teachers can access this resource." });
            return;
        }

        const usersWithGrades = await userModel.aggregate([
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all grades" });
    }
}

// הבאת ממוצע ציוני כל הסטודנטים
export const getAverageAll = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        if (req.user?.role !== "teacher") {
            res.status(403).json({ message: "Forbidden: Only teachers can access this resource." });
            return;
        }

        const average = await userModel.aggregate([
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all grades" });
    }
}

// הוספת ציון לסטודנט
export const addGrade = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        if (req.user?.role !== "teacher") {
            res.status(403).json({ message: "Forbidden: Only teachers can access this resource." });
            return;
        }

        const { passportId, grade } = req.body;

        if (!passportId || !grade) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const updatedGrade = await userModel.findOneAndUpdate(
            { passportId },
            { $push: { grades: { ...grade } } },
            { new: true }
        );

        if (!updatedGrade) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(grade);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding grade" });
    }
}
