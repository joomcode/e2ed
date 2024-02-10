import {join} from 'node:path';

import {ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY, TESTCAFERC_PATH} from '../../constants/internal';
import {createTestCafe} from '../../testcafe';

import {getFullPackConfig} from '../config';
import {setRunLabel} from '../environment';
import {E2edError} from '../error';
import {generalLog, setSuccessfulTotalInPreviousRetries} from '../generalLog';
import {getNotIncludedInPackTests} from '../notIncludedInPackTests';
import {startResourceUsageReading} from '../resourceUsage';
import {setTestCafeInstance} from '../testCafe';

import type {RunRetryOptions} from '../../types/internal';

/**
 * Runs tests (via TestCafe JavaScript API, for running one retry in docker).
 * Rejects, if there are some failed tests.
 * @internal
 */
export const runTests = async ({
  concurrency,
  runLabel,
  successfulTestRunNamesHash,
}: RunRetryOptions): Promise<void> => {
  setRunLabel(runLabel);

  try {
    const successfulTotalInPreviousRetries = Object.keys(successfulTestRunNamesHash).length;

    setSuccessfulTotalInPreviousRetries(successfulTotalInPreviousRetries);

    const {browsers: browsersString, resourceUsageReadingInternal} = getFullPackConfig();
    const browsers = [browsersString];

    startResourceUsageReading(resourceUsageReadingInternal);

    const notIncludedInPackTests = await getNotIncludedInPackTests();
    const notIncludedInPackTestsInAbsolutePaths = notIncludedInPackTests.map((testFilePath) =>
      join(ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY, testFilePath),
    );

    const testCafeInstance = await createTestCafe({browsers, configFile: TESTCAFERC_PATH});

    setTestCafeInstance(testCafeInstance);

    const runner = testCafeInstance.createRunner();

    const failedTestsCount = await runner
      .browsers(browsers)
      .concurrency(concurrency)
      .filter((testName: string, fixtureName: string, absoluteTestFilePath: string) => {
        if (notIncludedInPackTestsInAbsolutePaths.includes(absoluteTestFilePath)) {
          return false;
        }

        return !successfulTestRunNamesHash[testName];
      })
      .run();

    if (failedTestsCount !== 0) {
      throw new E2edError(`Got ${failedTestsCount} failed tests in retry with label "${runLabel}"`);
    }
  } catch (error) {
    generalLog(`Caught an error when running tests in retry with label "${runLabel}"`, {error});

    throw error;
  }
};
