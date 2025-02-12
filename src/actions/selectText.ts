import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = {};

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
  log(
    `Select text in input element, from ${startPos} to ${endPos ?? 'the end'}`,
    {options, selector},
    LogEventType.InternalAction,
  );

  // TODO
  return Promise.resolve();
};
