import {e2edEnvironment, START_TIME_IN_MS_VARIABLE_NAME} from '../constants/internal';

import type {UtcTimeInMs} from '../types/internal';

/**
 * e2ed start time (UTC, in milliseconds).
 */
const startTimeInMs = (Number(e2edEnvironment[START_TIME_IN_MS_VARIABLE_NAME]) ||
  Date.now()) as UtcTimeInMs;

e2edEnvironment[START_TIME_IN_MS_VARIABLE_NAME] = String(startTimeInMs);

export {RunEnvironment} from '../constants/internal';

export {startTimeInMs};
