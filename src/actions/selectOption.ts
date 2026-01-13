import {LogEventType} from '../constants/internal';
import {step} from '../step';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['selectOption']>[1];

/**
 * Selects an `option` in `select` element.
 */
export const selectOption = (
  selector: Selector,
  value: string | readonly string[],
  options: Options = {},
): Promise<void> =>
  step(
    `Select an option with value "${String(value)}" in <select> element ${selector.description}`,
    async () => {
      await selector.getPlaywrightLocator().selectOption(value, options);
    },
    {payload: options, type: LogEventType.InternalAction},
  );
