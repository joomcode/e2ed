import {RunEnvironment, setRunEnvironment} from '../configurator';
import {generalLog} from '../utils/generalLog';
import {
  getAfterRetries,
  getPrintedRetry,
  runRetries,
  truncateRetriesStateForLogs,
} from '../utils/retry';

import type {RetriesState, UtcTimeInMs} from '../types/internal';

setRunEnvironment(RunEnvironment.Docker);

const retriesState: RetriesState = {
  concurrency: 1,
  failedTestNamesInLastRetry: [],
  isLastRetrySuccessful: false,
  maxRetriesCount: 1,
  retryIndex: 1,
  startLastRetryTimeInMs: 0 as UtcTimeInMs,
  successfulTestRunNamesHash: {},
  visitedTestRunEventsFileName: [],
};

runRetries(retriesState)
  .catch((error: unknown) => {
    const printedRetry = getPrintedRetry(retriesState);

    generalLog(`Caught unexpected error on ${printedRetry}`, {
      error,
      retriesState: truncateRetriesStateForLogs(retriesState),
    });
  })
  .finally(getAfterRetries(retriesState));
