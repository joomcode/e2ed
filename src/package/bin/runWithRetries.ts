#!/usr/bin/env node

import {registerFinishE2edEvent, registerRunE2edEvent} from '../utils/events';
import {failTestsToString} from '../utils/failTestsToString';
import {generalLog} from '../utils/generalLog';
import {getConcurrencyForNextRetry} from '../utils/getConcurrencyForNextRetry';
import {getFailedTestsFromJsonReport} from '../utils/getFailedTestsFromJsonReport';
import {getIntegerFromEnvVariable} from '../utils/getIntegerFromEnvVariable';
import {getStartMessage} from '../utils/getStartMessage';
import {runTests} from '../utils/runTests';

import type {FailTest, FailTests, RunE2edEvent, UtcTimeInMs} from '../types/internal';

process.env.E2ED_IS_DOCKER_RUN = 'true';

let concurrency = getIntegerFromEnvVariable({
  defaultValue: 5,
  maxValue: 50,
  name: 'E2ED_CONCURRENCY',
});

const retries = getIntegerFromEnvVariable({
  defaultValue: 5,
  maxValue: 10,
  name: 'E2ED_DOCKER_RETRIES',
});

const startTimeInMs = Date.now() as UtcTimeInMs;

let allTestsCount = 0;
let retryIndex = 1;
let runLabel = '';
let tests: readonly FailTest[] = [];
let testsCount = 0;

const asyncRunTests = async (): Promise<void> => {
  const startMessage = getStartMessage();
  const runE2edEvent: RunE2edEvent = {
    concurrency,
    runEnvironment: 'docker',
    startMessage,
    utcTimeInMs: startTimeInMs,
  };

  generalLog(`${startMessage}\n`);

  await registerRunE2edEvent(runE2edEvent);

  for (; retryIndex <= retries; retryIndex += 1) {
    runLabel = `retry ${retryIndex}/${retries}`;

    const startRetryTimeInMs = Date.now() as UtcTimeInMs;
    const printedTestsString =
      tests.length === 0
        ? ')'
        : `, ${tests.length} failed tests out of ${allTestsCount}): ${failTestsToString(tests)}`;

    let failedTests: FailTests | undefined;

    generalLog(`Run tests (${runLabel}, concurrency ${concurrency}${printedTestsString}`);

    try {
      await runTests({concurrency, runLabel, tests});

      failedTests = getFailedTestsFromJsonReport();
    } catch (error: unknown) {
      generalLog(`Caught an error on ${runLabel}: ${String(error)}`);
    }

    if (failedTests) {
      tests = failedTests.tests;
    }

    if (failedTests && allTestsCount === 0) {
      allTestsCount = failedTests.allTestsCount;
      testsCount = allTestsCount;
    }

    testsCount = failedTests ? failedTests.allTestsCount : testsCount;

    const wordTest = testsCount === 1 ? 'test' : 'tests';

    generalLog(
      `${testsCount} ${wordTest} with ${runLabel} and concurrency ${concurrency} ran in ${
        Date.now() - startRetryTimeInMs
      } ms`,
    );

    if (failedTests && tests.length === 0) {
      generalLog(`[OK] All ${allTestsCount} tests completed successfully with ${runLabel}`);

      break;
    }

    concurrency = getConcurrencyForNextRetry({
      currentConcurrency: concurrency,
      lastRetryHasError: !failedTests,
      testsCount: tests.length,
    });
  }
};

asyncRunTests()
  .catch((error: unknown) => {
    generalLog(`Caught unexpected error on ${runLabel}: ${String(error)}`);
  })
  .finally(() => {
    const hasFailedTests = retryIndex > retries;

    if (hasFailedTests) {
      generalLog(
        `[FAIL] There are ${
          tests.length
        } failed tests (out of ${allTestsCount}) after ${retries} retries: ${failTestsToString(
          tests,
        )}`,
      );
    }

    const wordTest = allTestsCount === 1 ? 'test' : 'tests';
    const wordRetry = retries === 1 ? 'retry' : 'retries';
    const testsCountPrefix = allTestsCount > 0 ? `${allTestsCount} ${wordTest}` : 'Run';

    const finishTimeInMs = Date.now() as UtcTimeInMs;

    generalLog(
      `${testsCountPrefix} with all ${retries} ${wordRetry} lasted ${
        finishTimeInMs - startTimeInMs
      } ms`,
    );

    const finishE2edEvent = {utcTimeInMs: finishTimeInMs};

    registerFinishE2edEvent(finishE2edEvent)
      .catch((error: unknown) => {
        generalLog('Caught error on saving HTML report', {error});
      })
      .finally(() => {
        process.exit(hasFailedTests ? 1 : 0);
      });
  });
