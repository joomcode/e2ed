import {LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';

/**
 * Clears hover from all elements.
 */
export const clearHover = (): Promise<void> =>
  step(
    'Clear hover from all elements',
    async () => {
      const page = getPlaywrightPage();

      await page.mouse.move(0, 0);
    },
    {type: LogEventType.Action},
  );
