import {LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';

/**
 * Set the browser window size.
 */
export const resizeWindow = (width: number, height: number): Promise<void> =>
  step(
    `Set the browser window size to width ${width} and height ${height}`,
    async () => {
      const page = getPlaywrightPage();

      await page.setViewportSize({height, width});
    },
    {type: LogEventType.InternalAction},
  );
