import {config} from '../../testcaferc';
import {generalLog} from '../generalLog';

import {getTestRunEvent} from './getTestRunEvent';

import type {RejectTestRun, RunId, TestFn} from '../../types/internal';

type ClearAndTestFn = Readonly<{
  clearTimeout(): void;
  reject: RejectTestRun;
  testFnWithReject: TestFn;
}>;

/**
 * Set TestRun execution timeout (for every TestRun).
 */
export const setTestRunTimeout = (runId: RunId, testFn: TestFn): ClearAndTestFn => {
  const {testRunExecutionTimeout} = config;

  let rejectPromise: RejectTestRun | undefined;

  const promise = new Promise<void>((res, rej) => {
    rejectPromise = rej;
  });

  const testFnWithReject: TestFn = () => Promise.race([testFn(), promise]);

  const id = setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    reject(`TestRun out of time (${testRunExecutionTimeout} ms)`);
  }, testRunExecutionTimeout);

  /**
   * Clear TestRun execution timeout.
   */
  const clearTimeout = (): void => {
    globalThis.clearTimeout(id);
  };

  /**
   * Reject TestRun with some reason.
   */
  function reject(reason: string): void {
    const {ended} = getTestRunEvent(runId);

    if (ended) {
      return;
    }

    generalLog('Reject TestRun', {reason, runId});

    clearTimeout();
    rejectPromise?.(reason);
  }

  return {clearTimeout, reject, testFnWithReject};
};
