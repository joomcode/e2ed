import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['dblclick']>[0];

/**
 * Double-clicks an element.
 */
export const doubleClick = async (selector: Selector, options: Options = {}): Promise<void> => {
  const description = getDescriptionFromSelector(selector);
  const withDescription = description !== undefined ? ` with description ${description}` : '';

  log(`Double-click an element${withDescription}`, options, LogEventType.InternalAction);

  await selector.getPlaywrightLocator().dblclick(options);
};
