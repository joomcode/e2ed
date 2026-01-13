import {LogEventType} from '../constants/internal';
import {setTab} from '../context/tab';
import {step} from '../step';
import {switchPlaywrightPage} from '../utils/playwrightPage';

import type {InternalTab, Tab} from '../types/internal';

/**
 * Switches page context to the specified tab.
 */
export const switchToTab = (tab: Tab): Promise<void> =>
  step(
    'Switch page context to the specified tab',
    async () => {
      const {page} = tab as InternalTab;
      const url = page.url();

      setTab(tab);

      await switchPlaywrightPage(page);

      return {url};
    },
    {type: LogEventType.InternalAction},
  );
