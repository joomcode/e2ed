import {LogEventType} from '../constants/internal';
import {step} from '../step';

import {waitForInterfaceStabilization} from './waitFor';

import type {Locator} from '@playwright/test';

import type {Selector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<Locator['dispatchEvent']>[2] &
  WithStabilizationInterval &
  Readonly<{eventInit?: Parameters<Locator['dispatchEvent']>[1]}>;

/**
 * Dispatches an event over a specified DOM element.
 */
export const dispatchEvent = (
  selector: Selector,
  eventName: string,
  {eventInit, stabilizationInterval, ...options}: Options = {},
): Promise<void> =>
  step(
    `Dispatches an event "${eventName}" over a specified element`,
    async () => {
      await selector.getPlaywrightLocator().dispatchEvent(eventName, eventInit, options);

      if (stabilizationInterval !== undefined && stabilizationInterval > 0) {
        await waitForInterfaceStabilization(stabilizationInterval);
      }
    },
    {
      payload: {eventInit, ...options, selector, stabilizationInterval},
      type: LogEventType.InternalAction,
    },
  );
