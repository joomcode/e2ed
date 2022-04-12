import type {FailTest, UtcTimeInMs} from '../../types/internal';

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
  readonly startTimeInMs: UtcTimeInMs;
};
