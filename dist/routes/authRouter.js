"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = require("../controllers/authController.js");
const router = express_1.default.Router();
/**
 * @swagger
 * /registerTeacher:
 *   post:
 *     summary: Register a new teacher
 *     description: Register a teacher with name, email, password, and classroom.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid input)
 *       500:
 *         description: Server error
 */
router.post("/registerTeacher", authController_js_1.registerTeacher);
router.post("/registerStudent", authController_js_1.registerStudent);
exports.default = router;
