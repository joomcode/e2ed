import {mergeErrors} from './mergeErrors';

/**
 * Throws error, if any.
 * @internal
 */
export const throwIfAny = (errors: readonly (string | undefined)[]): void => {
  const error = mergeErrors(errors);

  if (error !== undefined) {
    throw new Error(error);
  }
};
