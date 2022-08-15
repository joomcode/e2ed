import {RunEnvironment, setRunEnvironment} from '../configurator';
import {generalLog} from '../utils/generalLog';
import {getAfterRetries, getPrintedRetry, runRetries} from '../utils/retry';

import type {RetriesState} from '../types/internal';

setRunEnvironment(RunEnvironment.Docker);

const retriesState: RetriesState = {
  allTestsCount: 0,
  maxRetriesCount: 1,
  remainingTests: [],
  retryIndex: 1,
  successfulTestRunNamesHash: {},
  visitedTestRunEventsFileName: [],
};

runRetries(retriesState)
  .catch((error: unknown) => {
    const printedRetry = getPrintedRetry(retriesState);

    generalLog(`Caught unexpected error on ${printedRetry}`, {error, retriesState});
  })
  .finally(getAfterRetries(retriesState));
