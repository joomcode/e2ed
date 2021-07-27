import {t as testController} from 'testcafe';

import {log} from '../utils/log';

type Options = Parameters<typeof testController.pressKey>[1];

/**
 * Presses the specified keyboard keys.
 */
export const pressKey = (keys: string, options?: Options): Promise<void> => {
  log(`Press keyboard keys: "${keys}"`, {options});

  return testController.pressKey(keys, options);
};
