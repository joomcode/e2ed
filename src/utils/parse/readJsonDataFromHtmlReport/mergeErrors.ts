/**
 * Merges several errors to one error, if any.
 * @internal
 */
export const mergeErrors = (errors: readonly (string | undefined)[]): string | undefined => {
  const definedErrors = errors.filter((error) => error !== undefined);

  return definedErrors.length > 0 ? definedErrors.join('.\n') : undefined;
};
