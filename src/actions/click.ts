import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['click']>[0];

/**
 * Clicks an element.
 */
export const click = async (selector: Selector, options: Options = {}): Promise<void> => {
  const description = getDescriptionFromSelector(selector);
  const withDescription = description !== undefined ? ` with description ${description}` : '';

  log(`Click an element${withDescription}`, options, LogEventType.InternalAction);

  await selector.getPlaywrightLocator().click(options);
};
