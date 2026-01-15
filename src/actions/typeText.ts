import {LogEventType} from '../constants/internal';
import {step} from '../step';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['fill']>[1];

/**
 * Types the specified text into an input element.
 */
export const typeText = (selector: Selector, text: string, options: Options = {}): Promise<void> =>
  step(
    `Type "${text}" into an input element`,
    async () => {
      await selector.getPlaywrightLocator().fill(text, options);
    },
    {payload: {...options, selector, text}, type: LogEventType.InternalAction},
  );
