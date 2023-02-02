import {inspect} from 'node:util';

import {valueToString} from './valueToString';

import type {E2edEnvironment, LogParams, RunLabel, UtcTimeInMs} from '../types/internal';

/**
 * Extended Error class for e2ed.
 */
export class E2edError extends Error {
  /**
   * Current runLabel at the time the error was created
   */
  readonly runLabel: RunLabel | undefined;

  /**
   * The time the error was generated.
   */
  readonly utcTimeInMs: UtcTimeInMs;

  constructor(readonly originalMessage: string, readonly params?: LogParams) {
    const runLabel = (process.env as E2edEnvironment).E2ED_RUN_LABEL;
    const utcTimeInMs = Date.now() as UtcTimeInMs;
    const dateTimeInIso = new Date(utcTimeInMs).toISOString();

    const fullMessage = `${originalMessage} ${valueToString({dateTimeInIso, params, runLabel})}`;
    const constructorArgs: [message: string, options?: {cause: unknown}] = [fullMessage];

    if (params?.cause) {
      constructorArgs.push({cause: params.cause});
    }

    // @ts-expect-error: Error constructor still doesn't support second argument
    super(...constructorArgs);

    this.utcTimeInMs = utcTimeInMs;
    this.runLabel = runLabel;

    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: true,
      value: fullMessage,
      writable: true,
    });
  }

  /**
   * Custom presentation of error for nodejs `inspect`.
   */
  [inspect.custom](): string {
    const printedParams = {
      dateTimeInIso: new Date(this.utcTimeInMs).toISOString(),
      message: this.originalMessage,
      params: this.params,
      runLabel: this.runLabel,
    };
    const printedString = valueToString(printedParams);

    return `E2edError ${printedString}`;
  }
}
