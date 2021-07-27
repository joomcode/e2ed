import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

/**
 * Removes all file paths from the specified file upload input.
 */
export const clearUpload = (selector: Selector): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log('Remove all file paths from file upload input', {locator});

  return testController.clearUpload(selector as globalThis.Selector);
};
