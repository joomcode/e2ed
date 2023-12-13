import {LogEventType} from '../../constants/internal';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';
import {getTimeoutPromise} from '../../utils/promise';

/**
 * Waits for timeout in `delayInMs` milliseconds.
 */
export const waitForTimeout = (delayInMs: number): Promise<void> => {
  const delayWithUnits = getDurationWithUnits(delayInMs);

  log(`Wait for ${delayWithUnits}`, LogEventType.InternalAction);

  return getTimeoutPromise(delayInMs);
};
