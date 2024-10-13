import { Request, Response } from "express";
import userModel from "../models/userModel.js";

// הוספת ציון לסטודנט
export const addGrade = async (req: Request, res: Response): Promise<void> => {
    const { passportId, grade } = req.body;

    if (!passportId || !grade) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        const updatedStudent = await userModel.findOneAndUpdate(
            { passportId },
            { $push: { grades: grade } },
            { new: true }
        );

        if (!updatedStudent) {
            res.status(404).json({ message: "Student not found" });
            return;
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: "Error adding grade" });
    }
}
