import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.scrollIntoView>[1];

/**
 * Scrolls the specified element into view.
 */
export const scrollIntoView = (selector: Selector, options?: Options): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  log(
    'Scroll the specified element into view',
    {description, options},
    LogEventType.InternalAction,
  );

  return testController.scrollIntoView(selector as unknown as TestCafeSelector, options);
};
