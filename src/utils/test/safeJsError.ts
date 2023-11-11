import type {BrowserJsError} from '../../types/internal';

/**
 * Safes browser JS errors for futher logging.
 * @internal
 */
export const safeJsError = (error?: BrowserJsError): true => {
  const key = Symbol.for('e2ed:JsErrors');
  const global = globalThis as {[key]?: BrowserJsError[]};
  // eslint-disable-next-line no-multi-assign
  const errors = (global[key] ??= []);

  if (error) {
    errors.push(error);
  }

  return true;
};
