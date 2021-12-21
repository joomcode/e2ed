import {config} from '../../testcaferc';

import {forceEndTestRunEvent} from './forceEndTestRunEvent';

import type {RunId, TestFn} from '../../types/internal';

type ClearAndTestFn = Readonly<{
  clear(): void;
  testFnWithTimeout: TestFn;
}>;

/**
 * Set TestRun execution timeout (for every TestRun).
 */
export const setTestRunTimeout = (runId: RunId, testFn: TestFn): ClearAndTestFn => {
  const {testRunExecutionTimeout} = config;

  let resolve: (() => void) | undefined;

  const promise = new Promise<void>((res) => {
    resolve = res;
  });

  const testFnWithTimeout: TestFn = () => Promise.race([testFn(), promise]);

  const id = setTimeout(() => {
    void forceEndTestRunEvent(runId).then(resolve);
  }, testRunExecutionTimeout);

  const clear = (): void => {
    clearTimeout(id);
    resolve?.();
  };

  return {clear, testFnWithTimeout};
};
