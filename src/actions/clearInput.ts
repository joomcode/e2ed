import {LogEventType} from '../constants/internal';
import {step} from '../step';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['clear']>[0];

/**
 * Clears the input field (of any type).
 */
export const clearInput = (selector: Selector, options: Options = {}): Promise<void> =>
  step(
    'Clear input field',
    async () => {
      await selector.getPlaywrightLocator().clear(options);
    },
    {payload: {...options, selector}, type: LogEventType.InternalAction},
  );
