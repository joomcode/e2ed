import type {StackFrame} from '../types/internal';

/**
 * For using arguments.callee we need to eval this function in non-strict mode.
 */
const getStackTraceBody = function getStackTrace(): StackFrame[] {
  const savedLimit = Error.stackTraceLimit;

  Error.stackTraceLimit = 5000;

  const originalPrepareStackTrace = Error.prepareStackTrace;

  Error.prepareStackTrace = function prepareStackTrace(_, stack) {
    return stack;
  };

  const error = new Error();

  // eslint-disable-next-line no-caller, no-restricted-properties
  Error.captureStackTrace(error, arguments.callee);

  const {stack} = error as unknown as {stack: StackFrame[]};

  Error.prepareStackTrace = originalPrepareStackTrace;

  Error.stackTraceLimit = savedLimit;

  return stack;
};

// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
const getStackTraceGetter = new Function(`return (${getStackTraceBody.toString()})`);

/**
 * Get V8 inner stack trace.
 * {@link https://www.npmjs.com/package/callsite}
 */
export const getStackTrace = getStackTraceGetter() as typeof getStackTraceBody;
