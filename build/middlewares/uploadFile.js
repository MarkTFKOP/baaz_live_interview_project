"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var destination = (0, multer_1.default)({ dest: "/uploads" });
exports.default = (function (req, res, next) {
    try {
        console.log(req);
        next();
    }
    catch (error) {
        console.log(error);
        next();
    }
});
