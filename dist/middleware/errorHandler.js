"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../types/response");
const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === "dev") {
        console.error(err.stack);
    }
    const response = new response_1.ResponseStructure(false, {}, err.message || err);
    res.status(500).json(response);
};
exports.errorHandler = errorHandler;
