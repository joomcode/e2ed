import {RunEnvironment, setRunEnvironment} from '../environment';
import {generalLog} from '../utils/generalLog';
import {getIntegerFromEnvVariable} from '../utils/getIntegerFromEnvVariable';
import {getAfterRetries, getPrintedRetry, runRetries} from '../utils/retry';

import type {UtcTimeInMs} from '../types/internal';

setRunEnvironment(RunEnvironment.Docker);

const maxRetriesCount = getIntegerFromEnvVariable({
  defaultValue: 5,
  maxValue: 50,
  name: 'E2ED_DOCKER_RETRIES',
});

const startTimeInMs = Date.now() as UtcTimeInMs;

const retriesState = {
  allTestsCount: 0,
  maxRetriesCount,
  remainingTests: [],
  retryIndex: 1,
  startTimeInMs,
};

runRetries(retriesState)
  .catch((error: unknown) => {
    generalLog(`Caught unexpected error on ${getPrintedRetry(retriesState)}: ${String(error)}`);
  })
  .finally(getAfterRetries(retriesState));
