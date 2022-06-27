import {valueToString} from './valueToString';

import type {LogParams} from '../types/internal';

/**
 * e2ed's own Error class.
 */
export class E2EDError extends Error {
  constructor(message: string, params?: LogParams) {
    const printedString = valueToString(params);

    const constructorArgs: [message: string, options?: {cause: unknown}] = [
      `${message} ${printedString}`,
    ];

    if (params?.cause) {
      constructorArgs.push({cause: params?.cause});
    }

    // @ts-expect-error: constructor Error still doesn't support second argument
    super(...constructorArgs);

    Object.assign(this, params);

    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: true,
      value: message,
      writable: true,
    });
  }
}
