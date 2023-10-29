import {startTimeInMs} from '../../configurator';

import {generalLog} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';

import {getPrintedTestsCount} from './getPrintedTestsCount';

import type {RetriesState} from '../../types/internal';

/**
 * After docker retries handler.
 * @internal
 */
export const afterRetries = (retriesState: RetriesState): void => {
  const {
    failedTestNamesInLastRetry,
    isLastRetrySuccessful,
    isRetriesCycleEnded,
    successfulTestRunNamesHash,
    retryIndex: retryIndexMaybePlusOne,
  } = retriesState;

  const durationWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);
  const durationString = `in ${durationWithUnits}`;
  const retryIndex = isRetriesCycleEnded ? retryIndexMaybePlusOne - 1 : retryIndexMaybePlusOne;
  const retryString = `${retryIndex} ${retryIndex === 1 ? 'retry' : 'retries'}`;

  if (isLastRetrySuccessful) {
    generalLog(
      `All ${getPrintedTestsCount(
        Object.keys(successfulTestRunNamesHash).length,
      )} completed successfully with ${retryString} ${durationString}`,
    );
  } else {
    generalLog(
      `There are ${getPrintedTestsCount(
        failedTestNamesInLastRetry.length,
        true,
      )} after ${retryString} ${durationString}`,
      {failedTestNamesInLastRetry},
    );
  }
};
