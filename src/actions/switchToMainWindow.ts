import {LogEventType} from '../constants/internal';
import {clearFrameContext} from '../context/frameContext';
import {step} from '../step';

/**
 * Switches browsing context to the main window.
 */
export const switchToMainWindow = (): Promise<void> =>
  step(
    'Switch browsing context to the main window',
    () => {
      clearFrameContext();
    },
    {type: LogEventType.InternalAction},
  );
