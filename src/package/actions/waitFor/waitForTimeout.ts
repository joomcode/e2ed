import {LogEventType} from '../../constants/internal';
import {log} from '../../utils/log';
import {getTimeoutPromise} from '../../utils/promise';

/**
 * Wait for timeout in delayInMs milliseconds.
 */
export const waitForTimeout = async (delayInMs: number): Promise<void> => {
  await log(`Wait for ${delayInMs}ms`, LogEventType.InternalAction);

  await getTimeoutPromise(delayInMs);
};
