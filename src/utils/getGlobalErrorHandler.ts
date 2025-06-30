import {TARGET_CLOSED_ERROR_MESSAGE, TEST_ENDED_ERROR_MESSAGE} from '../constants/internal';

import {E2edError} from './error';
import {writeGlobalError, writeGlobalWarning} from './fs';
import {writeLogsToFile} from './generalLog';

import type {GlobalErrorType} from '../types/internal';

/**
 * Get handler for `uncaughtException` and `unhandledRejection` errors.
 * @internal
 */
export const getGlobalErrorHandler =
  (type: GlobalErrorType) =>
  (cause: unknown): void => {
    try {
      const error = new E2edError(`Caught ${type}`, {cause});
      const errorString = error.toString();

      if (
        errorString.includes(TARGET_CLOSED_ERROR_MESSAGE) ||
        errorString.includes(TEST_ENDED_ERROR_MESSAGE)
      ) {
        return;
      }

      if (type === 'TestUnhandledRejection') {
        void writeGlobalWarning(errorString).catch(() => {});
      } else {
        void writeGlobalError(errorString).catch(() => {});
      }

      void writeLogsToFile().catch(() => {});
    } catch {}
  };
