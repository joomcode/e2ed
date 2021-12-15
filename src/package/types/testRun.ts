import type {Brand} from './brand';
import type {UtcTimeInMs} from './date';
import type {DeepReadonly} from './deep';
import type {RunTestEvent, TestCafeError} from './events';
import type {TestMeta} from './userland';

/**
 * Hash string of each test run, generated by userland hook.
 * Used in html report as url-hash for test runs.
 */
export type RunHash = Brand<string, 'RunHash'>;

/**
 * Unique id of each test run.
 */
export type RunId = Brand<string, 'RunId'>;

/**
 * Test options.
 */
export type TestOptions = DeepReadonly<{
  meta: TestMeta;
}>;

/**
 * Completed test run object.
 * Not internal because it used in user hooks.
 */
export type TestRun = Readonly<{
  errors: readonly TestCafeError[];
  startTimeInMs: UtcTimeInMs;
  finishTimeInMs: UtcTimeInMs;
}> &
  Omit<RunTestEvent, 'utcTimeInMs'>;