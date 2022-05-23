import {RunEnvironment, setRunEnvironment} from '../configurator';
import {generalLog} from '../utils/generalLog';
import {getAfterRetries, getPrintedRetry, runRetries} from '../utils/retry';

import type {UtcTimeInMs} from '../types/internal';

setRunEnvironment(RunEnvironment.Docker);

const startTimeInMs = Date.now() as UtcTimeInMs;

const retriesState = {
  allTestsCount: 0,
  maxRetriesCount: 1,
  remainingTests: [],
  retryIndex: 1,
  startTimeInMs,
};

runRetries(retriesState)
  .catch((error: unknown) => {
    generalLog(`Caught unexpected error on ${getPrintedRetry(retriesState)}: ${String(error)}`);
  })
  .finally(getAfterRetries(retriesState));
