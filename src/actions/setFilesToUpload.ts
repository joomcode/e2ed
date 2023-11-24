import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import type {Selector, TestCafeSelector} from '../types/internal';

/**
 * Populates the specified file upload input with file paths.
 */
export const setFilesToUpload = (
  selector: Selector,
  filePath: string | string[],
): Promise<void> => {
  const hasManyFiles = Array.isArray(filePath) && filePath.length > 0;
  const locator = getDescriptionFromSelector(selector);

  log(
    `Populate file upload input with file${hasManyFiles ? 's' : ''} "${String(filePath)}"`,
    {locator},
    LogEventType.InternalAction,
  );

  return testController.setFilesToUpload(selector as unknown as TestCafeSelector, filePath);
};
