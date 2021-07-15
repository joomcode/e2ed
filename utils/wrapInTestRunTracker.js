"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapInTestRunTracker = void 0;
const test_run_tracker_1 = __importDefault(require("testcafe/lib/api/test-run-tracker"));
const wrapInTestRunTracker = (fn) => test_run_tracker_1.default._createContextSwitchingFunctionHook(fn, 8);
exports.wrapInTestRunTracker = wrapInTestRunTracker;
