import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

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
  // eslint-disable-next-line @typescript-eslint/max-params
): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  log(
    `Select text in input element, from ${startPos} to ${
      endPos === undefined ? 'the end' : endPos
    }`,
    {description, options},
    LogEventType.InternalAction,
  );

  return testController.selectText(
    selector as unknown as TestCafeSelector,
    startPos,
    endPos,
    options,
  );
};
