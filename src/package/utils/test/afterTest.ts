import {registerEndTestRunEvent} from '../events';
import {generalLog} from '../generalLog';

import type {RunId, UtcTimeInMs} from '../../types/internal';

type Options = Readonly<{
  runError: string | undefined;
  runId: RunId;
}>;

/**
 * Internal after test hook.
 * @internal
 */
export const afterTest = async ({runError, runId}: Options): Promise<void> => {
  try {
    const utcTimeInMs = Date.now() as UtcTimeInMs;

    await registerEndTestRunEvent({runError, runId, utcTimeInMs});
  } catch (error) {
    generalLog('Caught error when run after test hook', {error});

    throw error;
  }
};
