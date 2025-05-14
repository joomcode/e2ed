import {E2edError} from './error';
import {writeGlobalError} from './fs';

import type {GlobalErrorType} from '../types/internal';

/**
 * Get handler for `uncaughtException` and `unhandledRejection` errors.
 * @internal
 */
export const getGlobalErrorHandler =
  (type: GlobalErrorType) =>
  (cause: unknown): void => {
    const error = new E2edError(`Caught ${type}`, {cause});

    void writeGlobalError(error.toString());
  };
