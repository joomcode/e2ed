#!/usr/bin/env node

import {generalLog} from '../utils/generalLog';
import {getFailedTestsFromJsonReport} from '../utils/getFailedTestsFromJsonReport';
import {getIntegerFromEnvVariable} from '../utils/getIntegerFromEnvVariable';
import {printStartParams} from '../utils/printStartParams';
import {runTests} from '../utils/runTests';

import type {FailTest, FailTests} from '../utils/getFailedTestsFromJsonReport';

process.env.E2ED_IS_DOCKER_RUN = 'true';

printStartParams();

const concurrency = getIntegerFromEnvVariable({
  defaultValue: 5,
  maxValue: 50,
  name: 'E2ED_CONCURRENCY',
});

const retries = getIntegerFromEnvVariable({
  defaultValue: 5,
  maxValue: 10,
  name: 'E2ED_DOCKER_RETRIES',
});

const startTime = Date.now();
const testsToString = (tests: FailTest[]): string => JSON.stringify(tests, null, 2);

let allTestsCount = 0;
let retryIndex = 1;
let runLabel = '';
let tests: FailTest[] = [];

const asyncRunTests = async (): Promise<void> => {
  for (; retryIndex <= retries; retryIndex += 1) {
    runLabel = `retry ${retryIndex}/${retries}`;

    const isFirstRetry = retryIndex === 1;
    const startRetryTime = Date.now();
    const printedTestsString = isFirstRetry
      ? ''
      : ` (${tests.length} failed tests out of ${allTestsCount}): ${testsToString(tests)}`;

    let failedTests: FailTests | undefined;

    generalLog(`Run tests with ${runLabel}${printedTestsString}`);

    try {
      await runTests({concurrency, isFirstRetry, tests, runLabel});

      failedTests = getFailedTestsFromJsonReport();
    } catch (error: unknown) {
      generalLog(`Caught an error on ${runLabel}: ${String(error)}`);
    }

    if (failedTests) {
      tests = failedTests.tests;
    }

    if (failedTests && isFirstRetry) {
      allTestsCount = failedTests.allTestsCount;
    }

    const testsCount = isFirstRetry ? allTestsCount : tests.length;

    generalLog(`${testsCount} tests with ${runLabel} ran in ${Date.now() - startRetryTime} ms`);

    if (failedTests && tests.length === 0) {
      generalLog(`[OK] All ${allTestsCount} tests completed successfully with ${runLabel}`);

      break;
    }
  }
};

asyncRunTests()
  .catch((error: unknown) => {
    generalLog(`Caught unexpected error on ${runLabel}: ${String(error)}`);
  })
  .finally(() => {
    if (retryIndex > retries) {
      generalLog(
        `[FAIL] There are ${
          tests.length
        } failed tests (out of ${allTestsCount}) after ${retries} retries: ${testsToString(tests)}`,
      );
    }

    const testsCountPrefix = allTestsCount > 0 ? `${allTestsCount} tests` : 'Run';

    generalLog(
      `${testsCountPrefix} with all ${retries} retries lasted ${Date.now() - startTime} ms`,
    );

    process.exit(0);
  });
