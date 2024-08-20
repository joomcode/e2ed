import {startTimeInMs} from '../../configurator';

import {getFullPackConfig} from '../config';
import {generalLog} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';

import {getPrintedTestsCount} from './getPrintedTestsCount';

import type {RetriesState} from '../../types/internal';

/**
 * After docker retries handler.
 * @internal
 */
export const afterRetries = (retriesState: RetriesState): void => {
  const {maxRetriesCountInDocker} = getFullPackConfig();
  const {failedTestNamesInLastRetry, successfulTestRunNamesHash} = retriesState;

  const durationWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);
  const durationString = `in ${durationWithUnits}`;
  const retryString = `${maxRetriesCountInDocker} ${maxRetriesCountInDocker === 1 ? 'retry' : 'retries'}`;

  const isLastRetrySuccessful = failedTestNamesInLastRetry.length === 0;

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
