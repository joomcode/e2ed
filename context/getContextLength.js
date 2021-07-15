"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContextLength = void 0;
const testcafe_1 = require("testcafe");
const getContextLength = () => Object.keys(testcafe_1.t.ctx.contexts || {}).length;
exports.getContextLength = getContextLength;
