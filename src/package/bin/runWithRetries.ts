#!/usr/bin/env node

import {getFailedTestsFromJsonReport} from './utils/getFailedTestsFromJsonReport';
import {runTests} from './utils/runTests';

import type {FailTest} from './utils/getFailedTestsFromJsonReport';

const MAX_RETRIES = 5;

const startTime = Date.now();
const log = (message: string): void => console.log(`[${new Date().toISOString()}] ${message}\n`);
const toString = (tests: FailTest[]): string => JSON.stringify(tests, null, 2);

let allTestsCount = 0;
let retryIndex = 1;
let runLabel = '';
let tests: FailTest[] = [];

const asyncRunTests = async (): Promise<void> => {
  for (; retryIndex <= MAX_RETRIES; retryIndex += 1) {
    runLabel = `retry ${retryIndex}/${MAX_RETRIES}`;

    const isFirstRetry = retryIndex === 1;
    const startRetryTime = Date.now();
    const printedTestsString = isFirstRetry
      ? ''
      : ` (${tests.length} failed tests out of ${allTestsCount}): ${toString(tests)}`;

    log(`Run tests with ${runLabel}${printedTestsString}`);

    await runTests({isFirstRetry, tests, runLabel});

    const failedTests = getFailedTestsFromJsonReport();

    tests = failedTests.tests;

    if (isFirstRetry) {
      allTestsCount = failedTests.allTestsCount;
    }

    const testsCount = isFirstRetry ? allTestsCount : tests.length;

    log(`${testsCount} tests with ${runLabel} ran in ${Date.now() - startRetryTime} ms`);

    if (tests.length === 0) {
      log(`[OK] All ${allTestsCount} tests completed successfully with ${runLabel}`);

      break;
    }
  }
};

asyncRunTests()
  .catch((error: unknown) => {
    log(`Caught error on ${runLabel}: ${String(error)}`);
  })
  .finally(() => {
    if (retryIndex > MAX_RETRIES) {
      log(
        `[FAIL] There are ${
          tests.length
        } failed tests (out of ${allTestsCount}) after ${MAX_RETRIES} retries: ${toString(tests)}`,
      );
    }

    const testsCountPrefix = allTestsCount > 0 ? `${allTestsCount} tests` : 'Run';

    log(`${testsCountPrefix} with all ${MAX_RETRIES} retries lasted ${Date.now() - startTime} ms`);

    process.exit(0);
  });
