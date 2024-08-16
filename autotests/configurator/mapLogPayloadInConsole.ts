import {isLocalRun} from 'e2ed/configurator';

import type {MapLogPayloadInConsole} from 'autotests/configurator';

/**
 * Maps log payload for logging in console to clarify, shorten or skip a console log entry.
 * If the mapping returns `skipLog`, the log entry is skipped.
 * If the mapping returns `undefined`, the log entry is not skipped, but is printed with an empty payload.
 */
export const mapLogPayloadInConsole: MapLogPayloadInConsole = (message, payload) => {
  if (isLocalRun) {
    return payload;
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (payload?.filePath && payload.successful) {
    return {filePath: payload.filePath, successful: payload.successful};
  }

  if (
    message.startsWith('Caught an error when running tests in retry') ||
    message.startsWith('Warning from TestCafe:') ||
    message.startsWith('Usage:')
  ) {
    return payload;
  }

  if (message.startsWith('Results of ')) {
    return undefined;
  }

  return 'skipLog';
};
