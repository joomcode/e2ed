import {LogEventType} from '../constants/internal';
import {clearTab} from '../context/tab';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';
import {switchPlaywrightPage} from '../utils/playwrightPage';

/**
 * Switches page context to the specified tab.
 */
export const switchToMainTab = (): Promise<void> =>
  step(
    'Switch page context to the main tab',
    async () => {
      clearTab();

      const page = getPlaywrightPage();
      const url = page.url();

      await switchPlaywrightPage(page);

      return {url};
    },
    {type: LogEventType.InternalAction},
  );
