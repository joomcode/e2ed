import {LogEventType} from '../constants/internal';
import {getPage} from '../useContext';
import {log} from '../utils/log';

import type {Keyboard} from '@playwright/test';

import type {KeyboardPressKey} from '../types/internal';

type Options = Parameters<Keyboard['press']>[1];

/**
 * Presses the specified keyboard keys.
 */
export const pressKey = async (key: KeyboardPressKey, options: Options = {}): Promise<void> => {
  log(`Press keyboard key: "${key}"`, options, LogEventType.InternalAction);

  const page = getPage();

  await page.keyboard.press(key, options);
};
