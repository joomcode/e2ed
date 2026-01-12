import {LogEventType} from '../constants/internal';
import {step} from '../step';

import {waitForInterfaceStabilization} from './waitFor';

import type {Locator} from '@playwright/test';

import type {Selector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<Locator['dragTo']>[1] & WithStabilizationInterval;

/**
 * Drags the source element towards the target element and drops it.
 */
export const dragTo = (
  sourceSelector: Selector,
  targetSelector: Selector,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> =>
  step(
    'Drag source element onto target element',
    async () => {
      await sourceSelector
        .getPlaywrightLocator()
        .dragTo(targetSelector.getPlaywrightLocator(), options);

      if (stabilizationInterval !== undefined && stabilizationInterval > 0) {
        await waitForInterfaceStabilization(stabilizationInterval);
      }
    },
    {
      payload: {sourceSelector, stabilizationInterval, ...options, targetSelector},
      type: LogEventType.InternalAction,
    },
  );
