import {createRunId} from '../createRunId';

import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {runTestFn} from './runTestFn';

import type {RunId, Test, TestController} from '../../types/internal';

type RunTest = (testController: TestController) => Promise<void>;

/**
 * Get complete run test function by TestRun state.
 * @internal
 */
export const getRunTest = (test: Test): RunTest => {
  let previousRunId: RunId | undefined;

  return async (testController: TestController) => {
    const runId = createRunId();

    let hasRunError = false;
    let unknownRunError: unknown;

    try {
      beforeTest({previousRunId, runId, test, testController});

      previousRunId = runId;

      await runTestFn(runId);
    } catch (error) {
      hasRunError = true;
      unknownRunError = error;

      throw error;
    } finally {
      await afterTest({hasRunError, runId, unknownRunError});
    }
  };
};
