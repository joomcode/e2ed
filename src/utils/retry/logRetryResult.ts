import {
  failMessage,
  generalLog,
  getSuccessfulTotalInPreviousRetries,
  okMessage,
} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';

import {getPrintedRetry} from './getPrintedRetry';
import {getPrintedTestsCount} from './getPrintedTestsCount';

import type {RetriesState} from '../../types/internal';

type Options = Readonly<{
  failedLength: number;
  newLength: number;
  retriesState: RetriesState;
  successfulLength: number;
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
  const {concurrency, maxRetriesCount, retryIndex, startLastRetryTimeInMs} = retriesState;

  const printedRetry = getPrintedRetry({maxRetriesCount, retryIndex});
  const stateMessage = retriesState.isLastRetrySuccessful ? okMessage : failMessage;
  const successfulTotalInPreviousRetries = getSuccessfulTotalInPreviousRetries();

  const durationWithUnits = getDurationWithUnits(Date.now() - startLastRetryTimeInMs);

  generalLog(
    `Results of ${printedRetry}: ${stateMessage} ${getPrintedTestsCount(
      newLength,
    )} with concurrency ${concurrency} ran in ${durationWithUnits} (${failedLength} failed, ${successfulLength} successful, ${
      newLength - unbrokenLength
    } broken). Total processed tests in all retries: ${newLength + successfulTotalInPreviousRetries}`,
  );
};
