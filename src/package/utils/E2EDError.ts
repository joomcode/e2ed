import {generalLog} from './generalLog';
import {valueToString} from './valueToString';

import type {LogContext} from '../types/internal';

type Params = Record<string, unknown>;

/**
 * e2ed's own Error class.
 */
export class E2EDError extends Error {
  constructor(message: string, params?: Params) {
    const printedObject: {params: Params | undefined; context?: LogContext | undefined} = {params};

    try {
      // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
      const hooks: typeof import('../hooks') = require('../hooks');

      printedObject.context = hooks.getLogContext();
    } catch (error) {
      generalLog('Cannot get log context from hooks for E2EDError', {message, error, params});
    }

    const printedString = valueToString(printedObject);

    super(`${message} ${printedString}`);

    Object.assign(this, params);
  }
}
