import {SCREENSHOT_NOT_SPECIFIED_ERROR_MESSAGE, TestRunStatus} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';

import type {Retry} from '../../types/internal';

/**
 * Get array of main parameters of pack's failed tests.
 * @internal
 */
export const getFailedTestsMainParams = (retries: readonly Retry[]): readonly string[] => {
  const firstRetry = retries[0];
  const lastRetry = retries.at(-1);

  const failedTests =
    lastRetry?.fullTestRuns.filter((fullTestRun) => fullTestRun.status === TestRunStatus.Failed) ??
    [];
  const failedTestsMainParams = failedTests.map(({mainParams}) => mainParams);

  if (retries.length <= 1) {
    return failedTestsMainParams;
  }

  const failedScreenshotTests =
    firstRetry?.fullTestRuns.filter(
      (fullTestRun) =>
        fullTestRun.status === TestRunStatus.Failed &&
        String(fullTestRun.runError).includes(SCREENSHOT_NOT_SPECIFIED_ERROR_MESSAGE),
    ) ?? [];

  for (const failedScreenshotTest of failedScreenshotTests) {
    assertValueIsFalse(
      failedTestsMainParams.includes(failedScreenshotTest.mainParams),
      'mainParams of failed screenshot test is unique',
      {duplicatedTest: failedScreenshotTest, failedScreenshotTests},
    );

    failedTestsMainParams.push(failedScreenshotTest.mainParams);
  }

  return failedTestsMainParams;
};
