import type {Fn} from './utils';

/**
 * Frame object from execution stack.
 */
export type StackFrame<F extends Fn = Fn, This = unknown> = Readonly<{
  getThis(): This;
  getTypeName(): string;
  getFunctionName(): string;
  getMethodName(): string;
  getFileName(): string;
  getLineNumber(): number;
  getColumnNumber(): number;
  getFunction(): F;
  getEvalOrigin(): string;
  getScriptNameOrSourceURL(): string;
  isNative(): boolean;
  isToplevel(): boolean;
  isEval(): boolean;
  isConstructor(): boolean;
}>;
