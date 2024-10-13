import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  classroom: mongoose.Types.ObjectId; 
  roll: "teacher";
}

const teacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: (value: string) => validator.isEmail(value), 
      message: "Invalid email format", 
    },
  },
  password: { type: String, required: true,  match: [/^[0-9]{9}$/, "password must be 9 digits"],
  },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
});

export const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);