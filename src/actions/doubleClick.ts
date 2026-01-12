import {LogEventType} from '../constants/internal';
import {step} from '../step';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['dblclick']>[0];

/**
 * Double-clicks an element.
 */
export const doubleClick = (selector: Selector, options: Options = {}): Promise<void> =>
  step(
    `Double-click an element ${selector.description}`,
    async () => {
      await selector.getPlaywrightLocator().dblclick(options);
    },
    {payload: {...options, selector}, type: LogEventType.InternalAction},
  );
