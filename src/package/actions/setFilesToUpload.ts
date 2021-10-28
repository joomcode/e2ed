import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';
import type {Inner} from 'testcafe-without-typecheck';

/**
 * Populates the specified file upload input with file paths.
 */
export const setFilesToUpload = (
  selector: Selector,
  filePath: string | string[],
): Promise<void> => {
  const hasManyFiles = Array.isArray(filePath) && filePath.length > 0;
  const locator = getLocatorFromSelector(selector);

  log(`Populate file upload input with file${hasManyFiles ? 's' : ''} "${String(filePath)}"`, {
    locator,
  });

  return testController.setFilesToUpload(selector as Inner.Selector, filePath);
};
