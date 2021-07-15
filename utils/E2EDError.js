"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E2EDError = void 0;
const util_1 = require("util");
const constants_1 = require("../constants");
const context_1 = require("../context");
class E2EDError extends Error {
    constructor(message, params) {
        const printedObject = { params, contextLength: (0, context_1.getContextLength)() };
        const printedString = (0, util_1.inspect)(printedObject, constants_1.DEFAULT_INSPECT_OPTIONS);
        super(`${message} ${printedString}`);
        Object.assign(this, params);
    }
}
exports.E2EDError = E2EDError;
