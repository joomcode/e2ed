"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMeta = exports.getMeta = void 0;
const useContext_1 = require("./useContext");
const [getRawMeta, setRawMeta] = (0, useContext_1.useContext)();
const getMeta = () => getRawMeta() || {};
exports.getMeta = getMeta;
const setMeta = (partialMeta) => {
    const meta = getRawMeta();
    setRawMeta({ ...meta, ...partialMeta });
};
exports.setMeta = setMeta;
