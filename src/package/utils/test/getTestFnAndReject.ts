import {RESOLVED_PROMISE} from '../../constants/internal';

import {E2EDError} from '../E2EDError';
import {generalLog} from '../generalLog';
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
 * by isSkipped flag, test function, runId and timeout.
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

  let isTestRunCompleted = false;
  let rejectPromise: RejectTestRun | undefined;

  const promiseWithReject = new Promise<void>((res, rej) => {
    rejectPromise = rej;
  });
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const timeoutId = setTimeout(rejectByTimeoutError, testTimeout);

  const testFnWithReject: TestFn = () =>
    Promise.race([testFn(), promiseWithReject]).finally(() => {
      isTestRunCompleted = true;
      clearTimeout(timeoutId);
    });

  /**
   * Reject test run by some run error.
   */
  const reject: RejectTestRun = (error) => {
    if (isTestRunCompleted) {
      return;
    }

    generalLog(`Reject test run ${runId} with run error`, {error});

    rejectPromise?.(error);
  };

  /**
   * Reject test run by timeout error.
   */
  function rejectByTimeoutError(): void {
    const error = new E2EDError(`Test run ${runId} was rejected after ${testTimeout}ms timeout`);

    reject(error);
  }

  return {reject, testFnWithReject};
};
