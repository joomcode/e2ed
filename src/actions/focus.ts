import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['focus']>[0];

/**
 * Focuses an element.
 */
export const focus = async (selector: Selector, options: Options = {}): Promise<void> => {
  log('Focus an element', {...options, selector}, LogEventType.InternalAction);

  await selector.getPlaywrightLocator().focus(options);
};
