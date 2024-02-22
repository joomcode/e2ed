import {replaceFields} from 'e2ed/configurator';

import {logFieldReplacer} from './logFieldReplacer';

import type {MapLogPayloadInLogFile} from 'autotests/configurator';

/**
 * Maps log payload for logging in file to clarify, shorten or skip a console log entry.
 * If the mapping returns `skipLog`, the log entry is skipped.
 * If the mapping returns `undefined`, the log entry is not skipped, but is printed with an empty payload.
 */
export const mapLogPayloadInLogFile: MapLogPayloadInLogFile = (_message, payload) =>
  replaceFields(payload, logFieldReplacer);
