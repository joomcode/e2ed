import {LogEventType} from '../constants/internal';
import {getPlaywrightPage} from '../useContext';
import {E2edError} from '../utils/error';
import {log} from '../utils/log';

import type {KeyboardPressKey, Selector} from '../types/internal';

type Options = Readonly<{delay?: number; timeout?: number}>;

type PressKey = ((
  this: void,
  selector: Selector,
  key: KeyboardPressKey,
  options?: Options,
) => Promise<void>) &
  ((this: void, key: KeyboardPressKey, options?: Options) => Promise<void>);

/**
 * Presses the specified keyboard keys.
 */
export const pressKey: PressKey = async (
  keyOrSelector: KeyboardPressKey | Selector,
  keyOrOptions?: KeyboardPressKey | Options,
  maybeOptions?: Options,
): Promise<void> => {
  let key: KeyboardPressKey;
  let selector: Selector | undefined;
  let options: Options;

  if (typeof keyOrSelector === 'string') {
    key = keyOrSelector;

    if (typeof keyOrOptions === 'string') {
      throw new E2edError('keyOrOptions is string', {
        keyOrOptions,
        keyOrSelector,
        maybeOptions,
      });
    }

    options = keyOrOptions ?? {};
  } else {
    selector = keyOrSelector;

    if (typeof keyOrOptions !== 'string') {
      throw new E2edError('keyOrOptions is not string', {
        keyOrOptions,
        keyOrSelector,
        maybeOptions,
      });
    }

    key = keyOrOptions;

    options = maybeOptions ?? {};
  }

  const withDescription = selector !== undefined ? ` on element ${selector.description}` : '';

  log(`Press keyboard key${withDescription}: "${key}"`, options, LogEventType.InternalAction);

  const page = getPlaywrightPage();

  if (selector !== undefined) {
    await selector.getPlaywrightLocator().press(key, options);
  } else {
    await page.keyboard.press(key, options);
  }
};
