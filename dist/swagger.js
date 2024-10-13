"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefintion = {
    openapi: '3.0.0',
    info: {
        title: "blog app",
        version: '1.0.0',
        description: 'this is the description of the blog app'
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ]
};
const options = {
    definition: swaggerDefintion,
    apis: ['./src/routes/*.ts', './src/app.ts']
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
