import mongoose, { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { Teacher } from "../models/TeacherModel.js";
import { Classroom } from "../models/ClassroomModel.js";
import { Student } from "../models/StudentModel.js";

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
      res.status(500).json({ error: error });
    }
  };

  export const registerStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, className } = req.body;
      const existingStudent = await Student.findOne({ email });
      if (existingStudent?.email === email) {
        res.status(400).json({ error: "Student is already registered" });
        return;
      }
      const classroom = await Classroom.findOne({ name: className });
      if (!classroom) {
        res.status(404).json({ error: "Classroom not found" });
        return;
      }
      const newStudent = new Student({
        name,
        email,
        password,
        classroom: classroom._id,
      });
      await newStudent.save();
      classroom.students?.push(newStudent._id as Types.ObjectId);
      await classroom.save();
  
      res.status(201).json({ message: "Student registered successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error|| "An error occurred" });
    }
  };

