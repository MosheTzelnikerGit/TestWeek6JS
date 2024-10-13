import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator"; 

interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  classroom: mongoose.Types.ObjectId; 
  grades: { score: number; comment: string }[];
  roll: "student";
}

const studentSchema = new Schema<IStudent>({
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
  password: { type: String,
    required: [true, "Please provide your password"],
    unique: true,
    match: [/^[0-9]{9}$/, "password must be  9 digits"]
},
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
  grades: [
    {
      score: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
});

export const Student = mongoose.model<IStudent>('Student', studentSchema);