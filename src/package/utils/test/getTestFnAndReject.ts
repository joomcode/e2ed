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

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const timeoutId = setTimeout(rejectByTimeoutError, testTimeout);

  /**
   * Reject test run by some error.
   */
  const reject: RejectTestRun = (error) => {
    clearTimeout(timeoutId);

    generalLog(`Reject test run ${runId} with error`, {error});

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
