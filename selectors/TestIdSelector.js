"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestIdSelector = void 0;
const testcafe_1 = require("testcafe");
const TestIdSelector = (id) => (0, testcafe_1.Selector)(`[data-testid='${id}']`);
exports.TestIdSelector = TestIdSelector;
