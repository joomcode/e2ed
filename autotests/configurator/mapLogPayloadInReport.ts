import {replaceFields} from 'e2ed/configurator';

import type {MapLogPayloadInReport} from 'autotests/types/packSpecific';
import type {FieldReplacer} from 'e2ed/types';

const maxStringLengthInReportLogs = 512;

const replacer: FieldReplacer = (path, value) => {
  if (typeof value === 'string' && value.length > maxStringLengthInReportLogs) {
    const halfOfLength = Math.floor(maxStringLengthInReportLogs / 2);
    const numberOfCuttedSymbols = value.length - 2 * halfOfLength;

    return `${value.slice(0, halfOfLength)}...(${numberOfCuttedSymbols} symbols)...${value.slice(
      -halfOfLength,
    )}`;
  }

  return value;
};

/**
 * Maps log payload for logging in HTML console to clarify, shorten or skip a console log entry.
 * If the mapping returns `skipLog`, the log entry is skipped.
 * If the mapping returns `undefined`, the log entry is not skipped, but is printed with an empty payload.
 */
export const mapLogPayloadInReport: MapLogPayloadInReport = (_message, payload) =>
  replaceFields(payload, replacer);
