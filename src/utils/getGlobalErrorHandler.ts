import {E2edError} from './error';
import {writeGlobalError} from './fs';
import {generalLog} from './generalLog';

import type {GlobalErrorType} from '../types/internal';

/**
 * Get handler for `uncaughtException` and `unhandledRejection` errors.
 * @internal
 */
export const getGlobalErrorHandler =
  (type: GlobalErrorType) =>
  (cause: unknown): void => {
    const message = `Caught ${type}`;

    generalLog(message, {cause});

    const error = new E2edError(message, {cause});

    void writeGlobalError(error.toString());
  };
