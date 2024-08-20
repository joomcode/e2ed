import {getFullPackConfig} from '../config';
import {generalLog} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';

import {getPrintedRetry} from './getPrintedRetry';
import {getPrintedTestsCount} from './getPrintedTestsCount';

import type {RetriesState} from '../../types/internal';

type Options = Readonly<{
  failedLength: number;
  newLength: number;
  retriesState: RetriesState;
  successfulLength: number;
  successfulTotalInPreviousRetries: number;
  unbrokenLength: number;
}>;

/**
 * Logs results of retry with `generalLog`.
 * @internal
 */
export const logRetryResult = ({
  failedLength,
  newLength,
  retriesState,
  successfulLength,
  unbrokenLength,
}: Options): void => {
  const {maxRetriesCountInDocker} = getFullPackConfig();
  const {concurrency, startLastRetryTimeInMs} = retriesState;

  const printedRetry = getPrintedRetry(maxRetriesCountInDocker);

  const durationWithUnits = getDurationWithUnits(Date.now() - startLastRetryTimeInMs);

  generalLog(
    `Results of ${printedRetry}: ${getPrintedTestsCount(newLength)} with concurrency ${concurrency} ran in ${durationWithUnits} (${failedLength} failed, ${successfulLength} successful, ${newLength - unbrokenLength} broken).`,
  );
};
