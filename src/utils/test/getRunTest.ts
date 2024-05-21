import {createRunId} from '../../generators/internal';

import {assertValueIsDefined} from '../asserts';
import {addTestToNotIncludedInPackTests} from '../notIncludedInPackTests';

import {afterErrorInTest} from './afterErrorInTest';
import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {getIsTestIncludedInPack} from './getIsTestIncludedInPack';
import {getTestStaticOptions} from './getTestStaticOptions';
import {processTestController} from './processTestController';
import {runTestFn} from './runTestFn';

import type {RunId, Test, TestController, TestStaticOptions} from '../../types/internal';

type RunTest = (testController: TestController) => Promise<void>;

const delayToCompleteTestRunAfterTestIsCompletedInMs = 300;

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
    let testStaticOptions: TestStaticOptions | undefined;
    let unknownRunError: unknown;

    try {
      testStaticOptions = getTestStaticOptions(test, testController);

      isTestIncludedInPack = getIsTestIncludedInPack(testStaticOptions);

      if (!isTestIncludedInPack) {
        await addTestToNotIncludedInPackTests(testStaticOptions.filePath);

        return;
      }

      processTestController(testController);

      beforeTest({previousRunId, runId, testFn: test.testFn, testStaticOptions});

      previousRunId = runId;

      await runTestFn(runId, testController, testStaticOptions);
    } catch (error) {
      hasRunError = true;
      unknownRunError = error;

      assertValueIsDefined(testStaticOptions, 'testStaticOptions is defined', {error, runId});

      await afterErrorInTest(testStaticOptions);

      throw error;
    } finally {
      if (isTestIncludedInPack) {
        setTimeout(
          () => void testController.testRun.emit('done'),
          delayToCompleteTestRunAfterTestIsCompletedInMs,
        );

        await afterTest({hasRunError, runId, unknownRunError});
      }
    }
  };
};
