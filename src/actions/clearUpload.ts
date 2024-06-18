import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Selector} from '../types/internal';

/**
 * Removes all file paths from the specified file upload input.
 */
export const clearUpload = (selector: Selector): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  log('Remove all file paths from file upload input', {description}, LogEventType.InternalAction);

  // TODO
  return Promise.resolve();
};
