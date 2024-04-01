import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<typeof testController.doubleClick>[1] & WithStabilizationInterval;

/**
 * Double-clicks an element.
 */
export const doubleClick = async (
  selector: Selector,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  const description = getDescriptionFromSelector(selector);
  const withDescription = description !== undefined ? ` with description ${description}` : '';

  log(
    `Double-click an element${withDescription}`,
    {...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.doubleClick(selector as unknown as TestCafeSelector, options);

  await waitForInterfaceStabilization(stabilizationInterval);
};
