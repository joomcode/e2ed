import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Selector, TestCafeSelector} from '../types/internal';

/**
 * Removes all file paths from the specified file upload input.
 */
export const clearUpload = (selector: Selector): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  log('Remove all file paths from file upload input', {description}, LogEventType.InternalAction);

  return testController.clearUpload(selector as unknown as TestCafeSelector);
};
