import {getError} from '../../context/error';
import {getRunId} from '../../context/runId';

import {registerEndTestRunEvent} from '../events';
import {generalLog} from '../generalLog';

import type {UtcTimeInMs} from '../../types/internal';

/**
 * Internal after test hook.
 * @internal
 */
export const afterTest = async (): Promise<void> => {
  try {
    const utcTimeInMs = Date.now() as UtcTimeInMs;
    const runId = getRunId();

    await registerEndTestRunEvent({error: getError(), runId, utcTimeInMs});
  } catch (error) {
    generalLog('Caught error when run after test hook', {error});
  }
};
