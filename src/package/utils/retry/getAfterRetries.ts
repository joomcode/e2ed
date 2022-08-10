import {startTimeInMs} from '../../configurator';

import {registerEndE2edRunEvent} from '../events';
import {generalLog} from '../generalLog';

import {failTestsToString} from './failTestsToString';

import type {RetriesState, UtcTimeInMs} from '../../types/internal';

/**
 * Get after retries handler.
 * @internal
 */
export const getAfterRetries =
  ({allTestsCount, maxRetriesCount, remainingTests, retryIndex}: RetriesState): (() => void) =>
  () => {
    const hasFailedTests = retryIndex > maxRetriesCount;

    if (hasFailedTests) {
      generalLog(
        `[FAIL] There are ${
          remainingTests.length
        } failed tests (out of ${allTestsCount}) after ${maxRetriesCount} retries: ${failTestsToString(
          remainingTests,
        )}`,
      );
    }

    const wordTest = allTestsCount === 1 ? 'test' : 'tests';
    const wordRetry = maxRetriesCount === 1 ? 'retry' : 'retries';
    const testsCountPrefix = allTestsCount > 0 ? `${allTestsCount} ${wordTest}` : 'Run';

    const endTimeInMs = Date.now() as UtcTimeInMs;

    generalLog(
      `${testsCountPrefix} with all ${maxRetriesCount} ${wordRetry} lasted ${
        endTimeInMs - startTimeInMs
      } ms`,
    );

    const endE2edRunEvent = {utcTimeInMs: endTimeInMs};

    void registerEndE2edRunEvent(endE2edRunEvent);
  };
