import express from "express";
import { registerTeacher ,registerStudent, login} from "../controllers/authController.js";

const router = express.Router();




/**
 * @swagger
 * /api/auth/registerTeacher:
 *  post:
 *      summary: register Teacher
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          className:
 *                              type: string
 * 
 * 
 *      responses:
 *          201:
 *              description: register Teacher
 * 
 */


router.post("/registerTeacher", registerTeacher);

/**
 * @swagger
 * /api/auth/registerStudent:
 *  post:
 *      summary: register Student
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          className:
 *                              type: string
 * 
 * 
 *      responses:
 *          201:
 *              description: register Student
 * 
 */

router.post("/registerStudent", registerStudent);



router.get("/login", login);



export default router;
