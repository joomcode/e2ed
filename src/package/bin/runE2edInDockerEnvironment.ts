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
};

runRetries(retriesState)
  .catch((error: unknown) => {
    generalLog(`Caught unexpected error on ${getPrintedRetry(retriesState)}: ${String(error)}`);
  })
  .finally(getAfterRetries(retriesState));
