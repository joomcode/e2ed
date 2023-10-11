import type {Fn} from './fn';

/**
 * Frame object from V8 execution stack.
 */
export type StackFrame<F extends Fn = Fn, This = unknown> = Readonly<{
  getThis(): This;
  getTypeName(): string;
  getFunctionName(): string | null;
  getMethodName(): string;
  getFileName(): string;
  getLineNumber(): number;
  getColumnNumber(): number;
  getFunction(): F;
  getEvalOrigin(): string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  getScriptNameOrSourceURL(): string;
  isNative(): boolean;
  isToplevel(): boolean;
  isEval(): boolean;
  isConstructor(): boolean;
}>;
