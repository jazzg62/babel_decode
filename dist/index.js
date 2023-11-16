"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
const generator_1 = __importDefault(require("@babel/generator"));
const types = __importStar(require("@babel/types"));
const fs_1 = require("fs");
let code = (0, fs_1.readFileSync)('./source_code.js').toString();
let ast = (0, parser_1.parse)(code, { sourceType: 'script' });
(0, traverse_1.default)(ast, {
    Literal(path) {
        // path.addComment('inner', 'hello')
        if (types.isStringLiteral(path.node) && path.node.value) {
            path.node.value = new String(path.node.value + '');
        }
    },
});
let out = (0, generator_1.default)(ast, { jsescOption: { "minimal": true } }).code;
console.log(out);
(0, fs_1.writeFileSync)('./out_code.js', out.toString());
//# sourceMappingURL=index.js.map