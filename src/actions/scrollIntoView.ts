import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['scrollIntoViewIfNeeded']>[0];

/**
 * Scrolls the specified element into view.
 */
export const scrollIntoView = (selector: Selector, options?: Options): Promise<void> => {
  log('Scroll the specified element into view', {options, selector}, LogEventType.InternalAction);

  return selector.getPlaywrightLocator().scrollIntoViewIfNeeded(options);
};
