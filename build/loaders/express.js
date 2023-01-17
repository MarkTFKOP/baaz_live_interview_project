"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = __importDefault(require("../routes"));
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = (function (express) {
    var app = express();
    var PORT = process.env.PORT || 3001;
    var MONGO_URI = process.env.MONGO_URI || "";
    app.use(express.json());
    app.use("/", (0, routes_1.default)());
    app.use("/status", function (req, res) {
        res.send("server connected");
    });
    app.listen(PORT, function () {
        console.log("\n            #####################################################\n                           server connected: ".concat(PORT, "\n            #####################################################"));
    });
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connect(MONGO_URI).then(function () {
        console.log("                           db connected\n            #####################################################\n      ");
    });
});
