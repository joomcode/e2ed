import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<typeof testController.click>[1] & WithStabilizationInterval;

/**
 * Clicks an element.
 */
export const click = async (
  selector: Selector,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  const description = getDescriptionFromSelector(selector);
  const withDescription = description ? ` with description ${description}` : '';

  log(
    `Click an element${withDescription}`,
    {...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.click(selector as unknown as TestCafeSelector, options);

  await waitForInterfaceStabilization(stabilizationInterval);
};
