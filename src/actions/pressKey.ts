import {LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';
import {assertValueIsDefined} from '../utils/asserts';
import {E2edError} from '../utils/error';

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
  let error: E2edError | undefined;
  let key: KeyboardPressKey | undefined;
  let selector: Selector | undefined;
  let options: Options | undefined;

  if (typeof keyOrSelector === 'string') {
    key = keyOrSelector;

    if (typeof keyOrOptions === 'string') {
      error = new E2edError('keyOrOptions is string', {
        keyOrOptions,
        keyOrSelector,
        maybeOptions,
      });
    } else {
      options = keyOrOptions ?? {};
    }
  } else {
    selector = keyOrSelector;

    if (typeof keyOrOptions !== 'string') {
      error = new E2edError('keyOrOptions is not string', {
        keyOrOptions,
        keyOrSelector,
        maybeOptions,
      });
    } else {
      key = keyOrOptions;

      options = maybeOptions ?? {};
    }
  }

  const withDescription = selector !== undefined ? ` on element ${selector.description}` : '';

  await step(
    `Press keyboard key${withDescription}: "${key}"`,
    async () => {
      if (error !== undefined) {
        throw error;
      }

      assertValueIsDefined(key, 'key is defined', options);

      const page = getPlaywrightPage();

      if (selector !== undefined) {
        await selector.getPlaywrightLocator().press(key, options);
      } else {
        await page.keyboard.press(key, options);
      }
    },
    {payload: {key, ...options}, type: LogEventType.InternalAction},
  );
};
