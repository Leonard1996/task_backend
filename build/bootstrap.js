"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const Parser_1 = require("./utils/Parser");
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
function bootstrap() {
    (0, typeorm_1.createConnection)()
        .then(() => {
        Parser_1.Parser.init(path_1.default.join(__dirname, "./static/data.txt"));
    })
        .catch((error) => {
        console.log("Error connecting to database:", error);
    });
}
exports.bootstrap = bootstrap;
