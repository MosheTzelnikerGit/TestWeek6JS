"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStructure = void 0;
class ResponseStructure {
    constructor(success, data, message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }
}
exports.ResponseStructure = ResponseStructure;
