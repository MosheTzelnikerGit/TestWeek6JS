import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

// ממשק למשתמש
export interface IUser extends Document {
  _id: Types.ObjectId; // מזהה ייחודי
  username: string; // שם משתמש
  email: string; // דוא"ל
  password: string; // סיסמה
  role: string; // הוסף את שדה התפקיד
  profile: {
    bio?: string; // אופציונלי - ביוגרפיה
    socialLinks?: string[]; // אופציונלי - קישורים חברתיים
  };
  posts: Types.ObjectId[]; // פוסטים של המשתמש
  grades?: IGrade[]; // אופציונלי - ציונים של המשתמש
}

// ממשק לציון
export interface IGrade {
  subject: string; // לדוגמה, שם המקצוע
  score: number; // ניקוד
  date: Date; // תאריך הציון
}

// הגדרת הסכימה של המשתמש
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (emailInput: string) {
        return validator.isEmail(emailInput);
      },
      message: "Please provide a valid email address"
    },
  },
  password: { // הוסף שדה סיסמה
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: { // הוסף שדה תפקיד
    type: String,
    required: [true, "Role is required"], // חובה
    enum: ['user', 'admin'], // רשימת תפקידים אפשריים
  },
  profile: {
    bio: {
      type: String,
      maxLength: [500, "Bio cannot exceed 500 characters"],
    },
    socialLinks: [
      {
        type: String,
        validate: {
          validator: (value: string) => validator.isURL(value),
          message: "Please provide a valid URL"
        }
      }
    ]
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  grades: [
    {
      subject: {
        type: String,
        required: [true, "Subject is required"],
      },
      score: {
        type: Number,
        required: [true, "Score is required"],
        min: [0, "Score cannot be less than 0"],
        max: [100, "Score cannot exceed 100"],
      },
      date: {
        type: Date,
        required: [true, "Date is required"],
      }
    }
  ]
});

// ייצוא המודל של המשתמש
export default mongoose.model<IUser>("User", UserSchema);
