import {E2EDError} from '../E2EDError';
import {getFullConfig} from '../getFullConfig';

import {forceEndTestRunEvent} from './forceEndTestRunEvent';
import {getTestRunEvent} from './getTestRunEvent';

import type {RejectTestRun, RunId, TestFn} from '../../types/internal';

type ClearAndTestFn = Readonly<{
  clearTimeout(): void;
  reject: RejectTestRun;
  testFnWithReject: TestFn;
}>;

type TimeoutAndTestFn = Readonly<{
  runId: RunId;
  testFn: TestFn;
  testTimeout: number | undefined;
}>;

/**
 * Set TestRun execution timeout (for every TestRun).
 */
export const setTestRunTimeout = ({
  runId,
  testFn,
  testTimeout: testTimeoutFromTestOptions,
}: TimeoutAndTestFn): ClearAndTestFn => {
  const {testTimeout: testTimeoutFromConfig} = getFullConfig();

  const testTimeout = testTimeoutFromTestOptions ?? testTimeoutFromConfig;

  let rejectPromise: ((error: E2EDError) => void) | undefined;

  const promise = new Promise<void>((res, rej) => {
    rejectPromise = rej;
  });

  const testFnWithReject: TestFn = () => Promise.race([testFn(), promise]);

  const timeoutId = setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    reject(`TestRun out of time (${testTimeout} ms)`);
  }, testTimeout);

  /**
   * Clear TestRun execution timeout.
   */
  const clearTimeout = (): void => {
    globalThis.clearTimeout(timeoutId);
  };

  /**
   * Reject TestRun with some reason.
   */
  function reject(reason: string): void {
    const testRunEvent = getTestRunEvent(runId);

    if (testRunEvent.ended) {
      return;
    }

    const error = new E2EDError('Reject TestRun', {reason, runId});

    clearTimeout();
    rejectPromise?.(error);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!testRunEvent.ended) {
      setTimeout(() => {
        void forceEndTestRunEvent(runId);
      }, 500);
    }
  }

  return {clearTimeout, reject, testFnWithReject};
};
