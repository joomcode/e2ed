import {truncateArrayForLogs} from '../generalLog';

import type {RetriesState} from '../../types/internal';

type TruncatedFields =
  | 'failedTestNamesInLastRetry'
  | 'successfulTestRunNamesHash'
  | 'visitedTestRunEventsFileName';

type Return = {
  [Key in keyof RetriesState]: Key extends TruncatedFields ? object : RetriesState[Key];
};

/**
 * Truncate a retries state for a short printout.
 * @internal
 */
export const truncateRetriesStateForLogs = (retriesState: RetriesState): Return => {
  const {
    failedTestNamesInLastRetry,
    successfulTestRunNamesHash,
    visitedTestRunEventsFileName,
    ...restRetriesState
  } = retriesState;

  return {
    failedTestNamesInLastRetry: truncateArrayForLogs(failedTestNamesInLastRetry),
    successfulTestRunNamesHash: truncateArrayForLogs(Object.keys(successfulTestRunNamesHash)),
    visitedTestRunEventsFileName: truncateArrayForLogs(visitedTestRunEventsFileName),
    ...restRetriesState,
  };
};
