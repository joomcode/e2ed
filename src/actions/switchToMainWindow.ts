import {LogEventType} from '../constants/internal';
import {clearFrameContext} from '../context/frameContext';
import {log} from '../utils/log';

/**
 * Switches browsing context to the main window.
 */
export const switchToMainWindow = (): void => {
  log('Switch browsing context to the main window', LogEventType.InternalAction);

  clearFrameContext();
};
