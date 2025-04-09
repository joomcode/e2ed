import {getMeta} from '../context/meta';
import {getRunId} from '../context/runId';

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

    if (type.startsWith('Test')) {
      const meta = getMeta();
      const runId = getRunId();

      generalLog(message, {cause, meta, runId});

      return;
    }

    generalLog(message, {cause});

    const error = new E2edError(message, {cause});

    void writeGlobalError(error.toString());
  };
