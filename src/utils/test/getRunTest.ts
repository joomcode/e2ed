import {createRunId} from '../../generators/internal';
import {pageStorage} from '../../useContext';

import {assertValueIsDefined} from '../asserts';

import {afterErrorInTest} from './afterErrorInTest';
import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {getOutputDirectoryName} from './getOutputDirectoryName';
import {getShouldRunTest} from './getShouldRunTest';
import {getTestStaticOptions} from './getTestStaticOptions';
import {preparePage} from './preparePage';
import {runTestFn} from './runTestFn';
import {waitBeforeRetry} from './waitBeforeRetry';

import type {RunTest, Test, TestStaticOptions, TestUnit} from '../../types/internal';

/**
 * Get complete run test function by the complete test options.
 * @internal
 */
export const getRunTest =
  (test: Test): RunTest =>
  ({context, page, request}, testInfo): Promise<void> => {
    const runTest = async (): Promise<void> => {
      const retryIndex = testInfo.retry + 1;
      const runId = createRunId(test, retryIndex);

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

        const beforeRetryTimeout = await waitBeforeRetry(runId, testStaticOptions);

        clearPage = await preparePage(page);

        const testController = {context, page, request};

        const testUnit: TestUnit = {
          beforeRetryTimeout,
          outputDirectoryName: getOutputDirectoryName(testInfo.outputDir),
          retryIndex,
          runId,
          testController,
          testFn: test.testFn,
          testStaticOptions,
        };

        beforeTest(testUnit);

        await runTestFn(testUnit);
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
