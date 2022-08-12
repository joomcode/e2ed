import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector, TestCafeSelector} from '../types/internal';

/**
 * Removes all file paths from the specified file upload input.
 */
export const clearUpload = async (selector: Selector): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  await log('Remove all file paths from file upload input', {locator}, LogEventType.InternalAction);

  return testController.clearUpload(selector as TestCafeSelector);
};
