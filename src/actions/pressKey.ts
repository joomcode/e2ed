import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {WithStabilizationInterval} from '../types/internal';

type Options = Parameters<typeof testController.pressKey>[1] & WithStabilizationInterval;

/**
 * Presses the specified keyboard keys.
 */
export const pressKey = async (
  keys: string,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  log(
    `Press keyboard keys: "${keys}"`,
    {...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.pressKey(keys, options);

  await waitForInterfaceStabilization(stabilizationInterval);
};
