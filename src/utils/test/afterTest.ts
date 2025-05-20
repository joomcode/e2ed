import {getClearPage} from '../../context/clearPage';

import {registerEndTestRunEvent} from '../events';
import {generalLog, writeLogsToFile} from '../generalLog';

import type {EndTestRunEvent, UtcTimeInMs} from '../../types/internal';

type Options = Omit<EndTestRunEvent, 'utcTimeInMs'>;

/**
 * Internal after test hook.
 * @internal
 */
export const afterTest = async (options: Options): Promise<void> => {
  const utcTimeInMs = Date.now() as UtcTimeInMs;
  const endTestRunEvent: EndTestRunEvent = {...options, utcTimeInMs};

  try {
    const clearPage = getClearPage();

    await clearPage?.();

    await registerEndTestRunEvent(endTestRunEvent);
  } catch (error) {
    generalLog('Caught an error when register end test run event', {endTestRunEvent, error});

    await writeLogsToFile();

    throw error;
  }
};
