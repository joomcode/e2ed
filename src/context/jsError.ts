import {useContext} from '../useContext';

import type {JsError} from '../types/internal';

/**
 * Raw get and set browser JS errors array.
 * @internal
 */
const [getRawJsErrorsFromContext, setRawJsErrorsFromContext] = useContext<readonly JsError[]>();

/**
 * Get browser JS errors array.
 * @internal
 */
export const getJsErrorsFromContext = (): readonly JsError[] => {
  const maybeJsErrors = getRawJsErrorsFromContext();

  if (maybeJsErrors !== undefined) {
    return maybeJsErrors;
  }

  const jsErrors: readonly JsError[] = [];

  setRawJsErrorsFromContext(jsErrors);

  return jsErrors;
};
