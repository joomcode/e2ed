"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValueIsDefined = void 0;
const E2EDError_1 = require("./E2EDError");
function assertValueIsDefined(value) {
    if (value === undefined) {
        throw new E2EDError_1.E2EDError('Asserted value is undefined', { value });
    }
}
exports.assertValueIsDefined = assertValueIsDefined;
