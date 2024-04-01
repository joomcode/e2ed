import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<typeof testController.rightClick>[1] & WithStabilizationInterval;

/**
 * Double-clicks an element.
 */
export const rightClick = async (
  selector: Selector,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  const description = getDescriptionFromSelector(selector);
  const withDescription = description !== undefined ? ` with description ${description}` : '';

  log(
    `Right-click an element${withDescription}`,
    {...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.rightClick(selector as unknown as TestCafeSelector, options);

  await waitForInterfaceStabilization(stabilizationInterval);
};
