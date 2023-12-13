import type {Fn} from './fn';

/**
 * Frame object from V8 execution stack.
 */
export type StackFrame<SomeFunction extends Fn = Fn, This = unknown> = Readonly<{
  getColumnNumber(): number;
  getEvalOrigin(): string;
  getFileName(): string;
  getFunction(): SomeFunction;
  getFunctionName(): string | null;
  getLineNumber(): number;
  getMethodName(): string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  getScriptNameOrSourceURL(): string;
  getThis(): This;
  getTypeName(): string;
  isConstructor(): boolean;
  isEval(): boolean;
  isNative(): boolean;
  isToplevel(): boolean;
}>;
