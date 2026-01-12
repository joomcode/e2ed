import {LogEventType} from '../constants/internal';
import {step} from '../step';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['scrollIntoViewIfNeeded']>[0];

/**
 * Scrolls the specified element into view.
 */
export const scrollIntoView = (selector: Selector, options?: Options): Promise<void> =>
  step(
    'Scroll the specified element into view',
    async () => {
      await selector.getPlaywrightLocator().scrollIntoViewIfNeeded(options);
    },
    {payload: {...options, selector}, type: LogEventType.InternalAction},
  );
