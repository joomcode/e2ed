import {LogEventType} from '../constants/internal';
import {getPage} from '../useContext';
import {log} from '../utils/log';

import type {Keyboard} from '@playwright/test';

type Options = Parameters<Keyboard['type']>[1];

const MODIFIERS = ['Shift', 'Control', 'Alt', 'Meta', 'ShiftLeft', 'ControlOrMeta'];

const SPECIAL_KEYS = [
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'F12',
  'Digit0',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
  'Backquote',
  'Minus',
  'Equal',
  'Backslash',
  'Backspace',
  'Tab',
  'Delete',
  'Escape',
  'ArrowDown',
  'End',
  'Enter',
  'Home',
  'Insert',
  'PageDown',
  'PageUp',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
];

/**
 * Presses the specified keyboard keys.
 */
export const pressKey = async (keys: string, options: Options = {}): Promise<void> => {
  const beforePlus = keys.split('+')[0] ?? '';
  const isText = keys.length > 1 && !SPECIAL_KEYS.includes(keys) && !MODIFIERS.includes(beforePlus);

  log(`Press keyboard keys: "${keys}"`, {isText, options}, LogEventType.InternalAction);

  const page = getPage();

  await page.keyboard[isText ? 'type' : 'press'](keys, options);
};
