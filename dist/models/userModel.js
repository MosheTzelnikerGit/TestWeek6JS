"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
// הגדרת הסכימה של המשתמש
const UserSchema = new mongoose_1.Schema({
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
            validator: function (emailInput) {
                return validator_1.default.isEmail(emailInput);
            },
            message: "Please provide a valid email address"
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
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
                    validator: (value) => validator_1.default.isURL(value),
                    message: "Please provide a valid URL"
                }
            }
        ]
    },
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Post" }],
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
exports.default = mongoose_1.default.model("User", UserSchema);
