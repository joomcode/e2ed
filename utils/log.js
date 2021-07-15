"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const util_1 = require("util");
const constants_1 = require("../constants");
const context_1 = require("../context");
const getRandomId_1 = require("./getRandomId");
const getLabel = (label) => (label ? `[${label}]` : '');
const noop = () => { };
const writeLog = (message, payload) => {
    const dateTimeInISO = new Date().toISOString();
    if ((0, context_1.getMeta)().runId === undefined) {
        (0, context_1.setMeta)({ runId: (0, getRandomId_1.getRandomId)() });
    }
    const { runId } = (0, context_1.getMeta)();
    const contextLength = (0, context_1.getContextLength)();
    const maybeRunLabel = getLabel(process.env.E2ED_RUN_LABEL);
    const printedObject = { payload, contextLength };
    const printedString = (0, util_1.inspect)(printedObject, constants_1.DEFAULT_INSPECT_OPTIONS);
    console.log(`[e2ed][${dateTimeInISO}]${maybeRunLabel}[${runId || ''}] ${message} ${printedString}`);
};
exports.log = process.env.E2ED_SHOW_LOGS ? writeLog : noop;
