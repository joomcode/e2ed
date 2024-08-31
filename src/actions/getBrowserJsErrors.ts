import {LogEventStatus, LogEventType} from '../constants/internal';
import {getJsErrorsFromContext} from '../context/jsError';
import {log} from '../utils/log';

import type {JsError} from '../types/internal';

type Options = Readonly<{showErrorsInLog?: boolean}>;

/**
 * Get browser JS errors.
 */
export const getBrowserJsErrors = (options: Options = {}): readonly JsError[] => {
  const {showErrorsInLog = false} = options;
  const jsErrors = getJsErrorsFromContext();

  if (showErrorsInLog === false) {
    log('Get browser JS errors', LogEventType.InternalAction);
  } else {
    const logEventStatus = jsErrors.length > 0 ? LogEventStatus.Failed : LogEventStatus.Passed;

    log('Got browser JS errors', {jsErrors, logEventStatus}, LogEventType.InternalAction);
  }

  return jsErrors;
};
