import {inspect} from 'node:util';

import {e2edEnvironment, RUN_LABEL_VARIABLE_NAME} from '../../constants/internal';

import {valueToString} from '../valueToString';

import {getPrintedStackFrame} from './getPrintedStackFrame';
import {getStackTrace} from './getStackTrace';

import type {LogParams, RunLabel, StackFrame, UtcTimeInMs} from '../../types/internal';

function toString(this: E2edError): string {
  const printedParams = {
    message: this.message,
    // eslint-disable-next-line sort-keys
    dateTimeInIso: new Date(this.utcTimeInMs).toISOString(),
    params: this.params,
    runLabel: this.runLabel,
    stackTrace: this.stackTrace,
  };
  const printedString = valueToString(printedParams);

  return `E2edError ${printedString}`;
}

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
   * Custom JSON presentation of error.
   */
  readonly toJSON = toString;

  /**
   * Custom string presentation of error.
   */
  override readonly toString = toString;

  /**
   * The time the error was generated.
   */
  readonly utcTimeInMs: UtcTimeInMs;

  /**
   * Custom presentation of error for nodejs `inspect`.
   */
  readonly [inspect.custom] = toString;

  constructor(
    message: string,
    readonly params?: LogParams,
  ) {
    const runLabel = e2edEnvironment[RUN_LABEL_VARIABLE_NAME];
    const utcTimeInMs = Date.now() as UtcTimeInMs;

    const constructorArgs: [message: string, options?: {cause: unknown}] = [message];

    if (params?.cause) {
      constructorArgs.push({cause: params.cause});
    }

    // @ts-expect-error: Error constructor still doesn't support second argument
    super(...constructorArgs);

    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: true,
      value: this.message,
      writable: true,
    });

    if (params?.cause) {
      Object.defineProperty(this, 'cause', {
        configurable: true,
        enumerable: true,
        value: params.cause,
        writable: true,
      });
    }

    this.runLabel = runLabel;

    const framesStackTrace = getStackTrace() ?? ([] as readonly StackFrame[]);

    this.stackTrace = framesStackTrace.map(getPrintedStackFrame);
    this.utcTimeInMs = utcTimeInMs;
  }
}
