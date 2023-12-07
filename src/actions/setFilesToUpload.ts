import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Selector, TestCafeSelector} from '../types/internal';

/**
 * Populates the specified file upload input with file paths.
 */
export const setFilesToUpload = (
  selector: Selector,
  filePath: string | string[],
): Promise<void> => {
  const hasManyFiles = Array.isArray(filePath) && filePath.length > 0;
  const description = getDescriptionFromSelector(selector);

  log(
    `Populate file upload input with file${hasManyFiles ? 's' : ''} "${String(filePath)}"`,
    {description},
    LogEventType.InternalAction,
  );

  return testController.setFilesToUpload(selector as unknown as TestCafeSelector, filePath);
};
