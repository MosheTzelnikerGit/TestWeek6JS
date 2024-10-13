import mongoose, { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { Teacher } from "../models/TeacherModel.js";
import { Classroom } from "../models/ClassroomModel.js";

export const registerTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, className } = req.body;
      const existingTeacher = await Teacher.findOne({ email });
      if (existingTeacher) {
        res.status(400).json({ error: "Teacher already has a classroom assigned" });
        return;
      }
      const existingClassroom = await Classroom.findOne({ name: className });
      if (existingClassroom) {
        res.status(400).json({ error: "Classroom with this name already exists" });
        return;
      }
      const newClass = new Classroom({ name: className });
      await newClass.save(); 
      const newTeacher = new Teacher({
        name,
        email,
        password,
        classroom: newClass._id,
      });
      await newTeacher.save(); 
      newClass.teacher = newTeacher._id as Types.ObjectId;
      await newClass.save();
  
      res.status(201).json({ classId: newClass._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
