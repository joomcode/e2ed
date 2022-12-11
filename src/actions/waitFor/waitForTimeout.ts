import {LogEventType} from '../../constants/internal';
import {log} from '../../utils/log';
import {getTimeoutPromise} from '../../utils/promise';

/**
 * Wait for timeout in delayInMs milliseconds.
 */
export const waitForTimeout = (delayInMs: number): Promise<void> => {
  log(`Wait for ${delayInMs}ms`, LogEventType.InternalAction);

  return getTimeoutPromise(delayInMs);
};
