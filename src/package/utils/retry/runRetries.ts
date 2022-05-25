/* eslint-disable no-param-reassign */

import {registerStartE2edRunEvent} from '../events';
import {generalLog} from '../generalLog';
import {getFullConfig} from '../getFullConfig';
import {getRunLabel} from '../runLabel';

import {failTestsToString} from './failTestsToString';
import {getConcurrencyForNextRetry} from './getConcurrencyForNextRetry';
import {getFailedTestsFromJsonReport} from './getFailedTestsFromJsonReport';
import {getPrintedRetry} from './getPrintedRetry';
import {runRetry} from './runRetry';

import type {E2edRunEvent, UtcTimeInMs} from '../../types/internal';

import type {FailTests, RetriesState} from './types';

/**
 * Run retries of remaining tests in a loop.
 * @internal
 */
export const runRetries = async (retriesState: RetriesState): Promise<void> => {
  const {startTimeInMs} = retriesState;

  const e2edRunEvent: E2edRunEvent = {
    utcTimeInMs: startTimeInMs,
  };

  await registerStartE2edRunEvent(e2edRunEvent);

  const fullConfig = getFullConfig();
  const {maxRetriesCountInDocker: maxRetriesCount} = fullConfig;

  Object.assign<RetriesState, Partial<RetriesState>>(retriesState, {maxRetriesCount});

  let {concurrency} = fullConfig;
  let previousTestsString = '';
  let testsCount = 0;

  for (; retriesState.retryIndex <= maxRetriesCount; retriesState.retryIndex += 1) {
    const runLabel = getRunLabel({
      concurrency,
      maxRetriesCount,
      retryIndex: retriesState.retryIndex,
    });

    const startRetryTimeInMs = Date.now() as UtcTimeInMs;
    const printedRetry = getPrintedRetry(retriesState);
    const printedTestsString =
      retriesState.remainingTests.length === 0
        ? ')'
        : `, ${retriesState.remainingTests.length} failed tests out of ${
            retriesState.allTestsCount
          }): ${failTestsToString(retriesState.remainingTests)}`;

    let failedTests: FailTests | undefined;

    generalLog(`Run tests (${printedRetry}, concurrency ${concurrency}${printedTestsString}`);

    try {
      await runRetry({concurrency, runLabel, tests: retriesState.remainingTests});

      failedTests = getFailedTestsFromJsonReport();
    } catch (error) {
      generalLog(`Caught an error on ${printedRetry}: ${String(error)}`);
    }

    if (failedTests) {
      retriesState.remainingTests = failedTests.tests;
    }

    if (failedTests && retriesState.allTestsCount === 0) {
      retriesState.allTestsCount = failedTests.allTestsCount;
      testsCount = retriesState.allTestsCount;
    }

    testsCount = failedTests ? failedTests.allTestsCount : testsCount;

    const wordTest = testsCount === 1 ? 'test' : 'tests';

    generalLog(
      `${testsCount} ${wordTest} with ${printedRetry} and concurrency ${concurrency} ran in ${
        Date.now() - startRetryTimeInMs
      } ms`,
    );

    if (failedTests && retriesState.remainingTests.length === 0) {
      generalLog(
        `[OK] All ${retriesState.allTestsCount} tests completed successfully with ${printedRetry}`,
      );

      break;
    }

    const currentTestsString = JSON.stringify(retriesState.remainingTests);

    concurrency = getConcurrencyForNextRetry({
      currentConcurrency: concurrency,
      lastRetryHasError: !failedTests,
      testsCount: retriesState.remainingTests.length,
      testsHaveNotChangedSinceLastTime: previousTestsString === currentTestsString,
    });

    previousTestsString = currentTestsString;
  }
};
