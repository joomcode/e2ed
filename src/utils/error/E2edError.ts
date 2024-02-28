import {inspect} from 'node:util';

import {e2edEnvironment, RUN_LABEL_VARIABLE_NAME} from '../../constants/internal';

import {valueToString} from '../valueToString';

import {getPrintedFields} from './getPrintedFields';
import {getPrintedStackFrame} from './getPrintedStackFrame';
import {getStackTrace} from './getStackTrace';

import type {
  E2edPrintedFields,
  LogParams,
  RunLabel,
  StackFrame,
  UtcTimeInMs,
} from '../../types/internal';

/**
 * Extended Error class for e2ed.
 */
export class E2edError extends Error {
  /**
   * Error message.
   */
  // @ts-expect-error: initialized by `Object.defineProperty`
  override readonly message: string;

  /**
   * Optional params of error.
   */
  readonly params?: LogParams;

  /**
   * Current runLabel at the time the error was created
   */
  readonly runLabel: RunLabel | undefined;

  /**
   * Current V8 stack trace (if available).
   */
  // @ts-expect-error: initialized by `Object.defineProperty`
  readonly stackTrace: readonly string[];

  /**
   * The time the error was generated.
   */
  readonly utcTimeInMs: UtcTimeInMs;

  constructor(message: string, params?: LogParams) {
    const runLabel = e2edEnvironment[RUN_LABEL_VARIABLE_NAME];
    const utcTimeInMs = Date.now() as UtcTimeInMs;

    const constructorArgs: [message: string, options?: {cause: unknown}] = [message];

    if (params?.cause) {
      constructorArgs.push({cause: params.cause});
    }

    super(...constructorArgs);

    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: true,
      value: message,
      writable: true,
    });

    if (params?.cause) {
      this.cause = params.cause;
    }

    this.runLabel = runLabel;

    const framesStackTrace = getStackTrace() ?? ([] as readonly StackFrame[]);

    Object.defineProperty(this, 'stackTrace', {
      configurable: true,
      enumerable: true,
      value: framesStackTrace.map(getPrintedStackFrame),
      writable: true,
    });

    this.utcTimeInMs = utcTimeInMs;
  }

  /**
   * Custom presentation of error for nodejs `inspect`.
   */
  [inspect.custom](): string {
    return this.toString();
  }

  /**
   * Custom JSON presentation of error.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  toJSON(): E2edPrintedFields {
    return getPrintedFields(this);
  }

  /**
   * Custom string presentation of error.
   */
  override toString(): string {
    const printedFields = getPrintedFields(this);
    const printedString = valueToString(printedFields);

    return `E2edError ${printedString}`;
  }
}
