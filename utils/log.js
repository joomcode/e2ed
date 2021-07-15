import { inspect } from 'util';
import { DEFAULT_INSPECT_OPTIONS } from '../constants';
import { getContextLength, getMeta, setMeta } from '../context';
import { getRandomId } from './getRandomId';
const getLabel = (label) => (label ? `[${label}]` : '');
const noop = () => { };
const writeLog = (message, payload) => {
    const dateTimeInISO = new Date().toISOString();
    if (getMeta().runId === undefined) {
        setMeta({ runId: getRandomId() });
    }
    const { runId } = getMeta();
    const contextLength = getContextLength();
    const maybeRunLabel = getLabel(process.env.E2ED_RUN_LABEL);
    const printedObject = { payload, contextLength };
    const printedString = inspect(printedObject, DEFAULT_INSPECT_OPTIONS);
    console.log(`[e2ed][${dateTimeInISO}]${maybeRunLabel}[${runId || ''}] ${message} ${printedString}`);
};
export const log = process.env.E2ED_SHOW_LOGS ? writeLog : noop;
