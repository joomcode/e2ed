import {registerEndE2edRunEvent, registerStartE2edRunEvent} from '../utils/events';
import {failTestsToString} from '../utils/failTestsToString';
import {generalLog} from '../utils/generalLog';
import {getConcurrencyForNextRetry} from '../utils/getConcurrencyForNextRetry';
import {getFailedTestsFromJsonReport} from '../utils/getFailedTestsFromJsonReport';
import {getFullConfig} from '../utils/getFullConfig';
import {getIntegerFromEnvVariable} from '../utils/getIntegerFromEnvVariable';
import {getRunLabel} from '../utils/runLabel';
import {runTests} from '../utils/runTests';

import type {E2edRunEvent, FailTest, FailTests, RunLabel, UtcTimeInMs} from '../types/internal';

process.env.E2ED_IS_DOCKER_RUN = 'true';

const retries = getIntegerFromEnvVariable({
  defaultValue: 5,
  maxValue: 50,
  name: 'E2ED_DOCKER_RETRIES',
});

const startTimeInMs = Date.now() as UtcTimeInMs;

let allTestsCount = 0;
let retryIndex = 1;
let runLabel: RunLabel;
let tests: readonly FailTest[] = [];
let testsCount = 0;
let previousTestsString = '';

const getPrintedRetry = (): string => `retry ${retryIndex}/${retries}`;

const asyncRunTests = async (): Promise<void> => {
  const e2edRunEvent: E2edRunEvent = {
    utcTimeInMs: startTimeInMs,
  };

  await registerStartE2edRunEvent(e2edRunEvent);

  let {concurrency} = getFullConfig();

  for (; retryIndex <= retries; retryIndex += 1) {
    runLabel = getRunLabel({concurrency, maxRetry: retries, retry: retryIndex});

    const startRetryTimeInMs = Date.now() as UtcTimeInMs;
    const printedRetry = getPrintedRetry();
    const printedTestsString =
      tests.length === 0
        ? ')'
        : `, ${tests.length} failed tests out of ${allTestsCount}): ${failTestsToString(tests)}`;

    let failedTests: FailTests | undefined;

    generalLog(`Run tests (${printedRetry}, concurrency ${concurrency}${printedTestsString}`);

    try {
      await runTests({concurrency, runLabel, tests});

      failedTests = getFailedTestsFromJsonReport();
    } catch (error) {
      generalLog(`Caught an error on ${printedRetry}: ${String(error)}`);
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
      `${testsCount} ${wordTest} with ${printedRetry} and concurrency ${concurrency} ran in ${
        Date.now() - startRetryTimeInMs
      } ms`,
    );

    if (failedTests && tests.length === 0) {
      generalLog(`[OK] All ${allTestsCount} tests completed successfully with ${printedRetry}`);

      break;
    }

    const currentTestsString = JSON.stringify(tests);

    concurrency = getConcurrencyForNextRetry({
      currentConcurrency: concurrency,
      lastRetryHasError: !failedTests,
      testsCount: tests.length,
      testsHaveNotChangedSinceLastTime: previousTestsString === currentTestsString,
    });

    previousTestsString = currentTestsString;
  }
};

asyncRunTests()
  .catch((error: unknown) => {
    generalLog(`Caught unexpected error on ${getPrintedRetry()}: ${String(error)}`);
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

    const endTimeInMs = Date.now() as UtcTimeInMs;

    generalLog(
      `${testsCountPrefix} with all ${retries} ${wordRetry} lasted ${
        endTimeInMs - startTimeInMs
      } ms`,
    );

    const endE2edRunEvent = {utcTimeInMs: endTimeInMs};

    registerEndE2edRunEvent(endE2edRunEvent)
      .catch((error: unknown) => {
        generalLog('Caught error on saving HTML report', {error});
      })
      .finally(() => {
        process.exit(hasFailedTests ? 1 : 0);
      });
  });
