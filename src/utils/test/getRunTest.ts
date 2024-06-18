import {createRunId} from '../../generators/internal';
import {pageStorage} from '../../useContext';

import {assertValueIsDefined} from '../asserts';
import {addTestToNotIncludedInPackTests} from '../notIncludedInPackTests';

import {afterErrorInTest} from './afterErrorInTest';
import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {getIsTestIncludedInPack} from './getIsTestIncludedInPack';
import {getTestStaticOptions} from './getTestStaticOptions';
import {preparePage} from './preparePage';
import {runTestFn} from './runTestFn';

import type {PlaywrightTestArgs, TestInfo} from '@playwright/test';

import type {Test, TestStaticOptions} from '../../types/internal';

type RunTest = (testController: PlaywrightTestArgs, testInfo: TestInfo) => Promise<void>;

/**
 * Get complete run test function by the complete test options.
 * @internal
 */
export const getRunTest =
  (test: Test): RunTest =>
  ({context, page, request}: PlaywrightTestArgs, testInfo: TestInfo): Promise<void> => {
    const runTest = async (): Promise<void> => {
      await preparePage(page);

      const retry = testInfo.retry + 1;
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

        beforeTest({retry, runId, testFn: test.testFn, testStaticOptions});

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
