import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['click']>[0];

/**
 * Clicks an element.
 */
export const click = async (selector: Selector, options: Options = {}): Promise<void> => {
  log(`Click an element ${selector.description}`, options, LogEventType.InternalAction);

  await selector.getPlaywrightLocator().click(options);
};
