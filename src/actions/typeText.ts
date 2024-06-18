import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['fill']>[1];

/**
 * Types the specified text into an input element.
 */
export const typeText = async (
  selector: Selector,
  text: string,
  options: Options = {},
): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  log(
    `Type "${text}" into an input element`,
    {description, ...options},
    LogEventType.InternalAction,
  );

  await selector.getPlaywrightLocator().fill(text, options);
};
