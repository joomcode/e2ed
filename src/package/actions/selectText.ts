import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.selectText>[3];

/**
 * Selects text in input elements.
 */
export const selectText = (
  selector: Selector,
  startPos = 0,
  endPos?: number,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log(
    `Select text in input element, from ${startPos} to ${
      endPos === undefined ? 'the end' : endPos
    }`,
    {locator, options},
  );

  return testController.selectText(selector as globalThis.Selector, startPos, endPos, options);
};
