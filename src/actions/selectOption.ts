import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['selectOption']>[1];

/**
 * Selects an `option` in `select` element.
 */
export const selectOption = async (
  selector: Selector,
  value: string | readonly string[],
  options: Options = {},
): Promise<void> => {
  log(
    `Select an option with value "${String(value)}" in <select> element ${selector.description}`,
    options,
    LogEventType.InternalAction,
  );

  await selector.getPlaywrightLocator().selectOption(value, options);
};
