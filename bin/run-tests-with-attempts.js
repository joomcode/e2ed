#!/usr/bin/env node

import {getFailedTestsFromJsonReport} from './utils/getFailedTestsFromJsonReport.js';
import {runTests} from './utils/runTests.js';

const MAX_ATTEMPTS = 5;

const startTime = Date.now();
const log = (message) => console.log(`[${new Date().toISOString()}] ${message}\n`);
const toString = (tests) => JSON.stringify(tests, null, 2);

let allTestsCount = 0;
let attemptIndex = 1;
let tests = [];

for (; attemptIndex <= MAX_ATTEMPTS; attemptIndex += 1) {
  const isFirstAttempt = attemptIndex === 1;
  const runLabel = `attempt ${attemptIndex}/${MAX_ATTEMPTS}`;
  const startAttemptTime = Date.now();
  const printedTestsString = isFirstAttempt
    ? ''
    : ` (${tests.length} failed tests out of ${allTestsCount}): ${toString(tests)}`;

  log(`Run tests with ${runLabel}${printedTestsString}`);

  await runTests({isFirstAttempt, tests, runLabel});

  const failedTests = getFailedTestsFromJsonReport();

  tests = failedTests.tests;

  if (isFirstAttempt) {
    allTestsCount = failedTests.allTestsCount;
  }

  const testsCount = isFirstAttempt ? allTestsCount : tests.length;

  log(`${testsCount} tests with ${runLabel} ran in ${Date.now() - startAttemptTime} ms`);

  if (tests.length === 0) {
    log(`[OK] All ${allTestsCount} tests completed successfully with ${runLabel}`);

    break;
  }
}

if (attemptIndex > MAX_ATTEMPTS) {
  log(
    `[FAIL] There are ${
      tests.length
    } failed tests (out of ${allTestsCount}) after ${MAX_ATTEMPTS} attempts: ${toString(tests)}`,
  );
}

log(`${allTestsCount} tests with all ${MAX_ATTEMPTS} attempts lasted ${Date.now() - startTime} ms`);

process.exit(0);
