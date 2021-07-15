"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContext = void 0;
const testcafe_1 = require("testcafe");
let callCount = 0;
const useContext = () => {
    callCount += 1;
    const contextIndex = callCount;
    const get = () => testcafe_1.t.ctx.contexts?.[contextIndex];
    const set = (value) => {
        if (testcafe_1.t.ctx.contexts === undefined) {
            testcafe_1.t.ctx.contexts = {};
        }
        testcafe_1.t.ctx.contexts[contextIndex] = value;
    };
    return [get, set];
};
exports.useContext = useContext;
