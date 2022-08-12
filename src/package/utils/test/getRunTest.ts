import {createRunId} from '../createRunId';
import {valueToString} from '../valueToString';

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
    let runError: string | undefined;

    try {
      beforeTest({previousRunId, runId, test, testController});

      await runTestFn(runId);
    } catch (unknownRunError) {
      runError = valueToString(unknownRunError);

      throw unknownRunError;
    } finally {
      previousRunId = runId;

      await afterTest({runError, runId});
    }
  };
};
