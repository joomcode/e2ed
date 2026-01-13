import {LogEventType} from '../constants/internal';
import {step} from '../step';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['focus']>[0];

/**
 * Focuses an element.
 */
export const focus = (selector: Selector, options: Options = {}): Promise<void> =>
  step(
    'Focus an element',
    async () => {
      await selector.getPlaywrightLocator().focus(options);
    },
    {payload: {...options, selector}, type: LogEventType.InternalAction},
  );
