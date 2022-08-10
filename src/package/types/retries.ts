import type {RunLabel} from './runLabel';

/**
 * Fail test params.
 * @internal
 */
export type FailTest = Readonly<{
  fixtureName: string;
  fixturePath: string;
  testName: string;
}>;

/**
 * Fail tests with all tests count.
 * @internal
 */
export type FailTests = Readonly<{
  allTestsCount: number;
  tests: readonly FailTest[];
}>;

/**
 * Internal state of one retry for remaining tests.
 * @internal
 */
export type RetriesState = {
  allTestsCount: number;
  readonly maxRetriesCount: number;
  remainingTests: readonly FailTest[];
  retryIndex: number;
};

/**
 * Options for running one retry of tests.
 * @internal
 */
export type TestCafeRunOptions = Readonly<{
  concurrency: number;
  runLabel: RunLabel;
  tests: readonly FailTest[];
}>;
