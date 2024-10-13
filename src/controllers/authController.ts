import mongoose, { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { Teacher } from "../models/TeacherModel.js";
import { Classroom } from "../models/ClassroomModel.js";
import { Student } from "../models/StudentModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
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
      res.status(500).json({ error: error|| "An error occurred"});
  }
  };



  export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        let user = await Student.findOne({ email });
        if (!user) {
            user = await Teacher.findOne({ email });
        }
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }
        const token = jwt.sign({ _id: user._id, email: user.email, roll: user.roll }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        res.cookie("token", token, { maxAge: 600000 });
        res.status(200).json({ token: token, success: true });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error || "An error occurred"});
}
}


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