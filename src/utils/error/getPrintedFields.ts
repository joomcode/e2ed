import type {E2edPrintedFields} from '../../types/internal';

import type {E2edError} from './E2edError';

/**
 * Get printed fields of `E2edError` instances for `toJSON`, `toString` and `inspect.custom` methods.
 * @internal
 */
export const getPrintedFields = (error: E2edError): E2edPrintedFields => ({
  message: error.message,
  // eslint-disable-next-line sort-keys
  dateTimeInIso: new Date(error.utcTimeInMs).toISOString(),
  params: error.params,
  runLabel: error.runLabel,
  stackTrace: error.stackTrace,
});
