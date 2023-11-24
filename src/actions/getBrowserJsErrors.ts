import {LogEventStatus, LogEventType} from '../constants/internal';
import {createClientFunction} from '../createClientFunction';
import {log} from '../utils/log';

import type {BrowserJsError} from '../types/internal';

type Options = Readonly<{
  showErrorsInLog?: boolean;
}>;

const clientGetBrowserJsErrors = createClientFunction<[], readonly BrowserJsError[] | undefined>(
  () => {
    const key = Symbol.for('e2ed:JsErrors');
    const global = window as {[key]?: BrowserJsError[]};
    // eslint-disable-next-line no-multi-assign
    const errors = (global[key] ??= []);

    return errors;
  },
  {name: 'getBrowserJsErrors'},
);

/**
 * Get browser JS errors.
 */
export const getBrowserJsErrors = (options: Options = {}): Promise<readonly BrowserJsError[]> => {
  const {showErrorsInLog = false} = options;

  if (showErrorsInLog === false) {
    log('Get browser JS errors', LogEventType.InternalAction);

    return clientGetBrowserJsErrors().then((jsErrors = []) => jsErrors);
  }

  return clientGetBrowserJsErrors().then((jsErrors = []) => {
    const logEventStatus = jsErrors.length > 0 ? LogEventStatus.Failed : LogEventStatus.Passed;

    log('Got browser JS errors', {jsErrors, logEventStatus}, LogEventType.InternalAction);

    return jsErrors;
  });
};
