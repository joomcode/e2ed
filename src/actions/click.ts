import {LogEventType} from '../constants/internal';
import {step} from '../step';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['click']>[0];

/**
 * Clicks an element.
 */
export const click = (selector: Selector, options: Options = {}): Promise<void> =>
  step(
    `Click an element ${selector.description}`,
    async () => {
      await selector.getPlaywrightLocator().click(options);
    },
    {payload: {...options, selector}, type: LogEventType.InternalAction},
  );
