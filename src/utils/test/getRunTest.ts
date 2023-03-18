import {createRunId} from '../../generators/internal';

import {generalLog} from '../generalLog';
import {addTestToNotIncludedInPackTests} from '../notIncludedInPackTests';

import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {getIsTestIncludedInPack} from './getIsTestIncludedInPack';
import {getTestStaticOptions} from './getTestStaticOptions';
import {runTestFn} from './runTestFn';

import type {RunId, Test, TestController} from '../../types/internal';

type RunTest = (testController: TestController) => Promise<void>;

/**
 * Get complete run test function by the complete test options.
 * @internal
 */
export const getRunTest = (test: Test): RunTest => {
  let previousRunId: RunId | undefined;

  return async (testController: TestController): Promise<void> => {
    const runId = createRunId();

    let hasRunError = false;
    let isTestIncludedInPack = false;
    let unknownRunError: unknown;

    try {
      const testStaticOptions = getTestStaticOptions(test, testController);

      isTestIncludedInPack = getIsTestIncludedInPack(testStaticOptions);

      if (!isTestIncludedInPack) {
        await addTestToNotIncludedInPackTests(testStaticOptions.filePath);

        return;
      }

      beforeTest({previousRunId, runId, testFn: test.testFn, testStaticOptions});

      previousRunId = runId;

      await runTestFn(runId);
    } catch (error) {
      hasRunError = true;
      unknownRunError = error;

      generalLog(`Test run ${runId} failed with error`, {error});

      throw error;
    } finally {
      if (isTestIncludedInPack) {
        await afterTest({hasRunError, runId, unknownRunError});
      }
    }
  };
};
