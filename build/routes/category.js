"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = __importDefault(require("../controllers"));
var uploadData_1 = require("../middlewares/uploadData");
var router = (0, express_1.Router)();
exports.default = (function (app) {
    app.use("/category", router);
    router.get("/", controllers_1.default.category.GetAllCategories);
    router.post("/", controllers_1.default.category.AddOneCategory);
    router.post("/image", (0, uploadData_1.uploadData)(), controllers_1.default.category.uploadCategoryImage);
    return router;
});
