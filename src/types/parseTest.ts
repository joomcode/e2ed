import type {Mutable} from './utils';

/**
 * Parse test context.
 * @internal
 */
export type ParseTestContext<StepKind extends string = string> = {
  comments: Record<number, number>;
  lineColumnCache: Record<number, LineColumn>;
  linesIndexes: readonly number[];
  name: string | undefined;
  options: ParsedTest<StepKind>['options'] | undefined;
  source: string;
  steps: Mutable<ParsedStep<StepKind>>[];
  testLineNumber: number;
};

/**
 * Line and column as position in source text.
 */
export type LineColumn = Readonly<{
  column: number;
  line: number;
}>;

/**
 * Parsed step object.
 */
export type ParsedStep<StepKind extends string = string> = Readonly<{
  definition: string | undefined;
  end: number;
  kind: StepKind;
  start: number;
}> &
  LineColumn;

/**
 * Parsed test object.
 */
export type ParsedTest<StepKind extends string = string> = Readonly<{
  name: string;
  options: Readonly<Record<string, unknown>> | undefined;
  steps: readonly ParsedStep<StepKind>[];
  testLineNumber: number;
}>;
