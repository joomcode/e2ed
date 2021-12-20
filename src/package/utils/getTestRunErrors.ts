import type {OriginalTestRunError, TestRunError} from '../types/internal';

/**
 * Get TestRun errors from original internal TestRun errors.
 * @internal
 */
export const getTestRunErrors = (
  originalTestRunErrors: readonly OriginalTestRunError[],
): readonly TestRunError[] => originalTestRunErrors.map(({errMsg}) => ({message: errMsg}));
