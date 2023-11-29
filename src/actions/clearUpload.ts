import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import type {Selector, TestCafeSelector} from '../types/internal';

/**
 * Removes all file paths from the specified file upload input.
 */
export const clearUpload = (selector: Selector): Promise<void> => {
  const locator = getDescriptionFromSelector(selector);

  log('Remove all file paths from file upload input', {locator}, LogEventType.InternalAction);

  return testController.clearUpload(selector as unknown as TestCafeSelector);
};
