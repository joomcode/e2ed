import {valueToString} from './valueToString';

import type {LogParams} from '../types/internal';

/**
 * Extended Error class for e2ed.
 */
export class E2EDError extends Error {
  constructor(message: string, params?: LogParams) {
    const fullMessage = `${message} ${valueToString(params)}`;

    const constructorArgs: [message: string, options?: {cause: unknown}] = [fullMessage];

    if (params?.cause) {
      constructorArgs.push({cause: params?.cause});
    }

    // @ts-expect-error: constructor Error still doesn't support second argument
    super(...constructorArgs);

    Object.assign(this, params);

    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: true,
      value: fullMessage,
      writable: true,
    });
  }
}
