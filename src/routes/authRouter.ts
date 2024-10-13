import express from "express";
import { registerTeacher ,registerStudent} from "../controllers/authController.js";

const router = express.Router();




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

router.post("/registerTeacher", registerTeacher);
router.post("/registerStudent", registerStudent);

export default router;
