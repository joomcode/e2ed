import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['hover']>[0];

/**
 * Hovers the mouse pointer over an element.
 */
export const hover = async (selector: Selector, options: Options = {}): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  log(
    'Hover the mouse pointer over an element',
    {description, ...options},
    LogEventType.InternalAction,
  );

  await selector.getPlaywrightLocator().hover(options);
};
