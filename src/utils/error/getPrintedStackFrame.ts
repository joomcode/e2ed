import type {StackFrame} from '../../types/internal';

/**
 * Get default printed stack trace presentation.
 * @internal
 */
export const getPrintedStackFrame = (stackFrame: StackFrame): string => {
  const functionName = stackFrame.getFunctionName() ?? 'anonymous';
  const sourceUrl = stackFrame.getScriptNameOrSourceURL();
  const lineNumber = stackFrame.getLineNumber();
  const columnNumber = stackFrame.getColumnNumber();

  return `${functionName} (${sourceUrl}:${lineNumber}:${columnNumber})`;
};
