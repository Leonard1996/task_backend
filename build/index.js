"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bootstrap_1 = require("./bootstrap");
const app = (0, express_1.default)();
(0, bootstrap_1.bootstrap)();
app.listen(3001, () => {
    console.log(`server started at http://localhost:${3001}`);
});
