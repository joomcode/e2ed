import {LogEventType} from '../constants/internal';
import {getPage} from '../useContext';
import {log} from '../utils/log';

import type {Keyboard} from '@playwright/test';

type Options = Parameters<Keyboard['type']>[1];

/**
 * Presses the specified keyboard keys.
 */
export const pressKey = async (keys: string, options: Options = {}): Promise<void> => {
  log(`Press keyboard keys: "${keys}"`, options, LogEventType.InternalAction);

  const page = getPage();

  await page.keyboard.type(keys, options);
};
