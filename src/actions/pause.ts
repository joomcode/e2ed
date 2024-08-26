import {LogEventType} from '../constants/internal';
import {getPlaywrightPage} from '../useContext';
import {log} from '../utils/log';

/**
 * Pauses the test and switches to the step-by-step execution mode.
 */
export const pause = (): Promise<void> => {
  log('Pause', LogEventType.InternalAction);

  const page = getPlaywrightPage();

  return page.pause();
};
