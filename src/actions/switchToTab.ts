import {LogEventType} from '../constants/internal';
import {setTab} from '../context/tab';
import {log} from '../utils/log';
import {switchPlaywrightPage} from '../utils/playwrightPage';

import type {InternalTab, Tab} from '../types/internal';

/**
 * Switches page context to the specified tab.
 */
export const switchToTab = async (tab: Tab): Promise<void> => {
  const {page} = tab as InternalTab;
  const url = page.url();

  log(`Switch page context to the specified tab at ${url}`, LogEventType.InternalAction);

  setTab(tab);

  await switchPlaywrightPage(page);
};
