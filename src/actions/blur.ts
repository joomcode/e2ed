import {LogEventType} from '../constants/internal';
import {step} from '../step';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['blur']>[0];

/**
 * Blur an element.
 */
export const blur = (selector: Selector, options: Options = {}): Promise<void> =>
  step(
    'Blur an element',
    async () => {
      await selector.getPlaywrightLocator().blur(options);
    },
    {payload: {...options, selector}, type: LogEventType.InternalAction},
  );
