import {LogEventType} from '../constants/internal';
import {createClientFunction} from '../createClientFunction';
import {log} from '../utils/log';

import type {BrowserJsError} from '../types/internal';

const clientGetBrowserJsErrors = createClientFunction(
  (): readonly BrowserJsError[] => {
    const key = Symbol.for('e2ed:JsErrors');
    const global = window as {[key]?: BrowserJsError[]};
    // eslint-disable-next-line no-multi-assign
    const errors = (global[key] ??= []);
    const copyOfErrors = [...errors];

    errors.length = 0;

    return copyOfErrors;
  },
  {name: 'getBrowserJsErrors'},
);

/**
 * Get browser JS errors.
 */
export const getBrowserJsErrors = (): Promise<readonly BrowserJsError[]> => {
  log('Get browser JS errors', LogEventType.InternalAction);

  return clientGetBrowserJsErrors();
};
