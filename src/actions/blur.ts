import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['blur']>[0];

/**
 * Blur an element.
 */
export const blur = async (selector: Selector, options: Options = {}): Promise<void> => {
  log('Blur an element', {...options, selector}, LogEventType.InternalAction);

  await selector.getPlaywrightLocator().blur(options);
};
