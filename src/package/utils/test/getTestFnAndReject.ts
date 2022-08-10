import {RESOLVED_PROMISE} from '../../constants/internal';

import {E2EDError} from '../E2EDError';
import {getFullConfig} from '../getFullConfig';

import type {RejectTestRun, RunId, TestFn} from '../../types/internal';

type Options = Readonly<{
  isSkipped: boolean;
  runId: RunId;
  testFn: TestFn;
  testTimeout: number | undefined;
}>;

type Return = Readonly<{reject: RejectTestRun; testFnWithReject: TestFn}>;

const skippedTestFnAndReject: Return = {
  reject: () => undefined,
  testFnWithReject: () => RESOLVED_PROMISE,
};

/**
 * Get test function with execution timeout and reject function,
 * by test function, runId and timeout.
 * @internal
 */
export const getTestFnAndReject = ({
  isSkipped,
  runId,
  testFn,
  testTimeout: testTimeoutFromTestOptions,
}: Options): Return => {
  if (isSkipped) {
    return skippedTestFnAndReject;
  }

  const {testTimeout: testTimeoutFromConfig} = getFullConfig();
  const testTimeout = testTimeoutFromTestOptions ?? testTimeoutFromConfig;

  let rejectPromise: RejectTestRun | undefined;

  const promiseWithReject = new Promise<void>((res, rej) => {
    rejectPromise = rej;
  });
  const testFnWithReject: TestFn = () => Promise.race([testFn(), promiseWithReject]);

  /**
   * Reject test run by timeout error.
   */
  const rejectByTimeoutError = (): void => {
    const error = new E2EDError(`Test run was rejected after ${testTimeout}ms timeout`, {runId});

    rejectPromise?.(error);
  };

  const timeoutId = setTimeout(rejectByTimeoutError, testTimeout);

  /**
   * Reject test run by some error.
   */
  const reject: RejectTestRun = (error) => {
    clearTimeout(timeoutId);

    rejectPromise?.(error);
  };

  return {reject, testFnWithReject};
};
