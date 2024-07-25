import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

/**
 * Pauses the test and switches to the step-by-step execution mode.
 */
export const debug = (): Promise<void> => {
  log('Start debug mode', LogEventType.InternalAction);

  // TODO
  return Promise.resolve();
};
