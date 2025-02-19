import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['hover']>[0];

/**
 * Hovers the mouse pointer over an element.
 */
export const hover = async (selector: Selector, options: Options = {}): Promise<void> => {
  log(
    'Hover the mouse pointer over an element',
    {...options, selector},
    LogEventType.InternalAction,
  );

  await selector.getPlaywrightLocator().hover(options);
};
