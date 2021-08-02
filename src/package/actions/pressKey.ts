import {t as testController} from 'testcafe';

import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

type Options = Parameters<typeof testController.pressKey>[1];

/**
 * Presses the specified keyboard keys.
 */
export const pressKey = async (keys: string, options?: Options): Promise<void> => {
  log(`Press keyboard keys: "${keys}"`, {options});

  await testController.pressKey(keys, options);

  await waitForInterfaceStabilization();
};
