import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

/**
 * Removes all file paths from the specified file upload input.
 */
export const clearUpload = (selector: Selector): Promise<void> => {
  log('Remove all file paths from file upload input', {selector}, LogEventType.InternalAction);

  // TODO
  return Promise.resolve();
};
