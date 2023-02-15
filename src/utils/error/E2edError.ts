import {inspect} from 'node:util';

import {e2edEnvironment, RUN_LABEL_VARIABLE_NAME} from '../../constants/internal';

import {valueToString} from '../valueToString';

import {getPrintedStackFrame} from './getPrintedStackFrame';
import {getStackTrace} from './getStackTrace';

import type {LogParams, RunLabel, StackFrame, UtcTimeInMs} from '../../types/internal';

/**
 * Extended Error class for e2ed.
 */
export class E2edError extends Error {
  /**
   * Current runLabel at the time the error was created
   */
  readonly runLabel: RunLabel | undefined;

  /**
   * Current V8 stack trace (if available).
   */
  readonly stackTrace: readonly string[];

  /**
   * The time the error was generated.
   */
  readonly utcTimeInMs: UtcTimeInMs;

  constructor(readonly originalMessage: string, readonly params?: LogParams) {
    const runLabel = e2edEnvironment[RUN_LABEL_VARIABLE_NAME];
    const utcTimeInMs = Date.now() as UtcTimeInMs;
    const dateTimeInIso = new Date(utcTimeInMs).toISOString();

    const fullMessage = `${originalMessage} ${valueToString({dateTimeInIso, params, runLabel})}`;
    const constructorArgs: [message: string, options?: {cause: unknown}] = [fullMessage];

    if (params?.cause) {
      constructorArgs.push({cause: params.cause});
    }

    // @ts-expect-error: Error constructor still doesn't support second argument
    super(...constructorArgs);

    this.runLabel = runLabel;

    const framesStackTrace = getStackTrace() ?? ([] as readonly StackFrame[]);

    this.stackTrace = framesStackTrace.map(getPrintedStackFrame);
    this.utcTimeInMs = utcTimeInMs;

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
      stackTrace: this.stackTrace,
    };
    const printedString = valueToString(printedParams);

    return `E2edError ${printedString}`;
  }
}
