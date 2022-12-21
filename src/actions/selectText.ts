import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.selectText>[3];

/**
 * Selects text in input elements.
 */
export const selectText = (
  selector: Selector,
  startPos = 0,
  endPos?: number,
  options?: Options,
  // eslint-disable-next-line max-params
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log(
    `Select text in input element, from ${startPos} to ${
      endPos === undefined ? 'the end' : endPos
    }`,
    {locator, options},
    LogEventType.InternalAction,
  );

  return testController.selectText(selector as TestCafeSelector, startPos, endPos, options);
};
