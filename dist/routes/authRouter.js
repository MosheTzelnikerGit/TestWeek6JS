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
router.post("/registerTeacher", authController_js_1.registerTeacher);
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
router.post("/registerStudent", authController_js_1.registerStudent);
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: register Teacher
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *
 *
 *
 *      responses:
 *          201:
 *              description: register Teacher
 *
 */
router.post("/login", authController_js_1.login);
exports.default = router;
