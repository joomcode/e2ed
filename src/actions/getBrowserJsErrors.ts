import {LogEventStatus, LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {BrowserJsError} from '../types/internal';

type Options = Readonly<{
  showErrorsInLog?: boolean;
}>;

/**
 * Get browser JS errors.
 */
export const getBrowserJsErrors = (options: Options = {}): Promise<readonly BrowserJsError[]> => {
  const {showErrorsInLog = false} = options;

  if (showErrorsInLog === false) {
    log('Get browser JS errors', LogEventType.InternalAction);

    return Promise.resolve([]);
  }

  // TODO
  return Promise.resolve([]).then((jsErrors = []) => {
    const logEventStatus = jsErrors.length > 0 ? LogEventStatus.Failed : LogEventStatus.Passed;

    log('Got browser JS errors', {jsErrors, logEventStatus}, LogEventType.InternalAction);

    return jsErrors;
  });
};
