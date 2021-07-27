import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

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

  return testController.setFilesToUpload(selector as globalThis.Selector, filePath);
};
