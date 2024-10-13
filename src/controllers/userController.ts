import userModel from "../models/userModel.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser, IGrade } from '../models/userModel.js'; // הוסף את IGrade כאן
import { errorHandler } from '../middleware/errorHandler.js';

// הגדרת UserRequest
export interface UserRequest extends Request {
    user?: {
        passportId: string;
        role: string;
        // הוסף שדות נוספים אם נדרש
    };
}

dotenv.config();

// יצירת יוזר חדש
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const newUser = await userModel.create(user);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}

// לוגין של יוזר
export const login = async (req: Request, res: Response): Promise<void> => {
    const { passportId, password } = req.body;

    try {
        const user = await userModel.findOne({ passportId });

        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
            return; 
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
}

// הבאת ציוני סטודנט ספציפי
const getGradeFromDB = async (passportId: string): Promise<IGrade[] | null | undefined> => { 
    try {
        const user = await userModel.findOne({ passportId });
        return user?.grades ?? null; // מחזיר null אם grades לא קיים
    } catch (error) {
        return null;
    }
}

// הבאת ציוני סטודנט ספציפי
export const getStudentGrades = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const grades = await getGradeFromDB(req.user!.passportId);

        if (!grades) {
            res.status(404).json({ message: "User grades not found" });
            return;
        }

        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ message: "Error getting student grades" });
    }
}

// הבאת ממוצע ציוני סטודנט
export const getStudentAverage = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const grades = await getGradeFromDB(req.user!.passportId);

        if (!grades || grades.length === 0) {
            res.status(404).json({ message: "User grades not found" });
            return;
        }

        const validGrades: IGrade[] = grades.filter((grade: IGrade) => typeof grade.score === 'number');
        const totalScore: number = validGrades.reduce((sum, grade) => sum + grade.score, 0);
        const average: number = validGrades.length > 0 ? totalScore / validGrades.length : 0;

        res.status(200).json({ average });
    } catch (error) {
        res.status(500).json({ message: "Error getting student average" });
    }
}
