import {createRunId} from '../../generators/internal';
import {pageStorage} from '../../useContext';

import {assertValueIsDefined} from '../asserts';

import {afterErrorInTest} from './afterErrorInTest';
import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {getShouldRunTest} from './getShouldRunTest';
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
      const retryIndex = testInfo.retry + 1;
      const runId = createRunId();

      let clearPage: (() => Promise<void>) | undefined;
      let hasRunError = false;
      let shouldRunTest = false;
      let testStaticOptions: TestStaticOptions | undefined;
      let unknownRunError: unknown;

      try {
        testStaticOptions = getTestStaticOptions(test, testInfo);

        shouldRunTest = await getShouldRunTest(testStaticOptions);

        if (!shouldRunTest) {
          return;
        }

        clearPage = await preparePage(page);

        beforeTest({retryIndex, runId, testFn: test.testFn, testStaticOptions});

        const testController = {context, page, request};

        await runTestFn({retryIndex, runId, testController, testStaticOptions});
      } catch (error) {
        hasRunError = true;
        unknownRunError = error;

        assertValueIsDefined(testStaticOptions, 'testStaticOptions is defined', {error, runId});

        await afterErrorInTest(testStaticOptions);

        throw error;
      } finally {
        if (shouldRunTest) {
          await afterTest({clearPage, hasRunError, runId, unknownRunError});
        }
      }
    };

    return pageStorage.run(page, runTest);
  };
