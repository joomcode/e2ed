import {E2EDError} from '../E2EDError';
import {getFullConfig} from '../getFullConfig';

import type {RunId, TestFn} from '../../types/internal';

type TimeoutAndTestFn = Readonly<{
  runId: RunId;
  testFn: TestFn;
  testTimeout: number | undefined;
}>;

/**
 * Get test function with execution timeout, by test function, runId and timeout.
 */
export const getTestFnWithTimeout = ({
  runId,
  testFn,
  testTimeout: testTimeoutFromTestOptions,
}: TimeoutAndTestFn): TestFn => {
  const {testTimeout: testTimeoutFromConfig} = getFullConfig();
  const testTimeout = testTimeoutFromTestOptions ?? testTimeoutFromConfig;

  let reject: ((error: E2EDError) => void) | undefined;

  const rejectAfterTimeout = new Promise<void>((res, rej) => {
    reject = rej;
  });
  const testFnWithTimeout: TestFn = () => Promise.race([testFn(), rejectAfterTimeout]);

  /**
   * Reject TestRun with timeout error.
   */
  const rejectWithError = (): void => {
    const error = new E2EDError(`Reject TestRun after ${testTimeout}ms timeout`, {runId});

    reject?.(error);
  };

  setTimeout(rejectWithError, testTimeout);

  return testFnWithTimeout;
};
