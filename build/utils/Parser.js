"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
//@ts-nocheck
const fs_1 = __importDefault(require("fs"));
const FORMATS = {
    TXT: "txt",
};
class Parser {
    static init(path) {
        const extension = path.split(".").at(-1);
        switch (extension) {
            case FORMATS.TXT:
                const data = fs_1.default.readFileSync(path, "utf-8");
                Parser.parseTxt(data);
                break;
        }
    }
    static parseTxt(fileData) {
        const data = {};
        let grandParent = null;
        let parent = null;
        let child = null;
        let grandChild = null;
        const lines = fileData.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
            let spaces = lines[i].search(/\S/);
            let txt = lines[i].trim();
            console.log(`Line from file: ${lines[i]}, ${lines[i].search(/\S/)}`);
            if (spaces === 0) {
                data[txt] = [];
                grandParent = data[txt];
            }
            if (spaces === 2) {
                const newParent = {};
                parent = newParent;
                grandParent.push(parent);
            }
            if (spaces === 4) {
                const [key, value] = txt.split(" = ");
                if (key && value) {
                    parent[key] = value;
                }
                else {
                    child = [];
                    parent[key] = child;
                }
            }
            if (spaces === 6) {
                const newGrandChild = {};
                grandChild = newGrandChild;
                child.push(grandChild);
            }
            if (spaces === 8) {
                const [key, value] = txt.split(" = ");
                grandChild[key] = value;
            }
        }
    }
}
exports.Parser = Parser;
