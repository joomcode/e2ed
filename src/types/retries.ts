import type {UtcTimeInMs} from './date';
import type {RunLabel} from './runLabel';

/**
 * Internal state of one retry for remaining tests.
 * @internal
 */
export type RetriesState = Readonly<{
  concurrency: number;
  failedTestNamesInLastRetry: readonly string[];
  isLastRetrySuccessful: boolean;
  isRetriesCycleEnded: boolean;
  maxRetriesCount: number;
  retryIndex: number;
  startLastRetryTimeInMs: UtcTimeInMs;
  successfulTestRunNamesHash: Record<string, true>;
  visitedTestRunEventsFileName: readonly string[];
}>;

/**
 * Options for running one retry of tests.
 * @internal
 */
export type RunRetryOptions = Readonly<{
  runLabel: RunLabel;
  successfulTestRunNamesHash: VisitedTestNamesHash;
}>;

/**
 * Hash of names of already visited tests (maybe, in previous retries).
 * @internal
 */
export type VisitedTestNamesHash = Readonly<Record<string, true>>;
