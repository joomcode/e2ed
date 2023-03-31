import {valueToString, wrapStringForLogs} from '../valueToString';

import {E2edError} from './E2edError';
import {getPrintedStackFrame} from './getPrintedStackFrame';

import type {RunError, StackFrame} from '../../types/internal';

type MaybeWithStackTrace = {
  callsite?: {readonly stackFrames?: readonly StackFrame[]};
  stackTrace?: readonly string[];
} | null;

/**
 * Get test run error from unknownRunError.
 * @internal
 */
export const getRunErrorFromError = (unknownRunError: unknown): RunError => {
  let error = unknownRunError as MaybeWithStackTrace;

  if (error === null || (typeof error !== 'object' && typeof error !== 'function')) {
    error = new E2edError(String(error));
  }

  if (error.callsite?.stackFrames) {
    const {stackFrames} = error.callsite;
    const filteredStackFrames = stackFrames.filter(
      (stackFrame) => !stackFrame.getFunctionName()?.includes('Callsite'),
    );

    error.stackTrace = filteredStackFrames.map(getPrintedStackFrame);
  }

  return wrapStringForLogs(valueToString(error));
};
