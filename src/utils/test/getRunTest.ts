import {createRunId} from '../../generators/internal';
import {pageStorage} from '../../useContext';

import {assertValueIsDefined} from '../asserts';
import {addTestToNotIncludedInPackTests} from '../notIncludedInPackTests';

import {afterErrorInTest} from './afterErrorInTest';
import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {getIsTestIncludedInPack} from './getIsTestIncludedInPack';
import {getTestStaticOptions} from './getTestStaticOptions';
import {runTestFn} from './runTestFn';

import type {PlaywrightTestArgs, TestInfo} from '@playwright/test';

import type {RunId, Test, TestStaticOptions} from '../../types/internal';

type RunTest = (testController: PlaywrightTestArgs, testInfo: TestInfo) => Promise<void>;

/**
 * Get complete run test function by the complete test options.
 * @internal
 */
export const getRunTest = (test: Test): RunTest => {
  let previousRunId: RunId | undefined;

  return ({context, page, request}: PlaywrightTestArgs, testInfo: TestInfo): Promise<void> => {
    const runTest = async (): Promise<void> => {
      const runId = createRunId();

      let hasRunError = false;
      let isTestIncludedInPack = false;
      let testStaticOptions: TestStaticOptions | undefined;
      let unknownRunError: unknown;

      try {
        testStaticOptions = getTestStaticOptions(test, testInfo);

        isTestIncludedInPack = getIsTestIncludedInPack(testStaticOptions);

        if (!isTestIncludedInPack) {
          await addTestToNotIncludedInPackTests(testStaticOptions.filePath);

          return;
        }

        beforeTest({previousRunId, runId, testFn: test.testFn, testStaticOptions});

        previousRunId = runId;

        await runTestFn(runId, {context, page, request}, testStaticOptions);
      } catch (error) {
        hasRunError = true;
        unknownRunError = error;

        assertValueIsDefined(testStaticOptions, 'testStaticOptions is defined', {error, runId});

        await afterErrorInTest(testStaticOptions);

        throw error;
      } finally {
        if (isTestIncludedInPack) {
          await afterTest({hasRunError, runId, unknownRunError});
        }
      }
    };

    return pageStorage.run(page, runTest);
  };
};
