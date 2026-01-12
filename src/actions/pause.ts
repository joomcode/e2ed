import {LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';

/**
 * Pauses the test and switches to the step-by-step execution mode.
 */
export const pause = (): Promise<void> =>
  step(
    'Pause',
    async () => {
      const page = getPlaywrightPage();

      await page.pause();
    },
    {type: LogEventType.InternalAction},
  );
