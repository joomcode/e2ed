import type {StackFrame} from '../types/internal';

/**
 * Get V8 inner stack trace.
 * {@link https://www.npmjs.com/package/callsite}
 */
export const getStackTrace = function getStackTrace(): StackFrame[] {
  const savedLimit = Error.stackTraceLimit;

  Error.stackTraceLimit = 5000;

  const originPrepareStackTrace = Error.prepareStackTrace;

  Error.prepareStackTrace = function prepareStackTrace(_, stack) {
    return stack;
  };

  const error = new Error();

  // eslint-disable-next-line no-caller, no-restricted-properties
  Error.captureStackTrace(error, arguments.callee);

  const {stack} = error as unknown as {stack: StackFrame[]};

  Error.prepareStackTrace = originPrepareStackTrace;

  Error.stackTraceLimit = savedLimit;

  return stack;
};
