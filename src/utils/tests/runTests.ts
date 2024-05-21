import {join} from 'node:path';

import {ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY, TESTCAFERC_PATH} from '../../constants/internal';
import {createTestCafe} from '../../testcafe';

import {getFullPackConfig} from '../config';
import {getRunLabel, setRunLabel} from '../environment';
import {E2edError} from '../error';
import {generalLog, setSuccessfulTotalInPreviousRetries} from '../generalLog';
import {setVisitedTestNamesHash} from '../globalState';
import {getNotIncludedInPackTests} from '../notIncludedInPackTests';
import {startResourceUsageReading} from '../resourceUsage';
import {setTestCafeInstance} from '../testCafe';

import {beforeRunFirstTest} from './beforeRunFirstTest';

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
  visitedTestNamesHash,
}: RunRetryOptions): Promise<void> => {
  setRunLabel(runLabel);
  setVisitedTestNamesHash(visitedTestNamesHash);

  try {
    const successfulTotalInPreviousRetries = Object.keys(successfulTestRunNamesHash).length;

    setSuccessfulTotalInPreviousRetries(successfulTotalInPreviousRetries);

    const {
      browserInitTimeout,
      browsers: browsersString,
      resourceUsageReadingInternal,
    } = getFullPackConfig();
    const browsers = [browsersString];

    startResourceUsageReading(resourceUsageReadingInternal);

    let beforeRunFirstTestWasCalled = false;

    const beforeRunFirstTestTimeoutId = setTimeout(() => {
      if (!beforeRunFirstTestWasCalled) {
        beforeRunFirstTestWasCalled = true;

        beforeRunFirstTest();
      }
    }, browserInitTimeout);

    beforeRunFirstTestTimeoutId.unref();

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
        if (!beforeRunFirstTestWasCalled) {
          beforeRunFirstTestWasCalled = true;

          beforeRunFirstTest();
        }

        if (notIncludedInPackTestsInAbsolutePaths.includes(absoluteTestFilePath)) {
          return false;
        }

        return !successfulTestRunNamesHash[testName];
      })
      .run();

    if (failedTestsCount !== 0) {
      const currentRunLabel = getRunLabel();

      throw new E2edError(
        `Got ${failedTestsCount} failed tests in retry with label "${currentRunLabel}"`,
      );
    }
  } catch (error) {
    const currentRunLabel = getRunLabel();

    generalLog(`Caught an error when running tests in retry with label "${currentRunLabel}"`, {
      error,
    });

    throw error;
  }
};
