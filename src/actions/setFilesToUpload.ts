import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Files = Parameters<Locator['setInputFiles']>[0];
type Options = Parameters<Locator['setInputFiles']>[1];

/**
 * Populates the specified file upload input with file paths.
 */
export const setFilesToUpload = async (
  selector: Selector,
  files: Files,
  options: Options = {},
): Promise<void> => {
  const hasManyFiles = Array.isArray(files) && files.length > 0;

  log(
    `Populate file upload input with file${hasManyFiles ? 's' : ''} "${String(files)}"`,
    {options, selector},
    LogEventType.InternalAction,
  );

  await selector.getPlaywrightLocator().setInputFiles(files, options);
};
