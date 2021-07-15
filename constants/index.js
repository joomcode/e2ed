"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PORT = exports.DEFAULT_INSPECT_OPTIONS = void 0;
const _testcaferc_json_1 = __importDefault(require("../.testcaferc.json"));
__exportStar(require("../../../e2ed/constants"), exports);
exports.DEFAULT_INSPECT_OPTIONS = {
    colors: true,
    depth: 16,
    showHidden: true,
};
exports.DEFAULT_PORT = _testcaferc_json_1.default;
