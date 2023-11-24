/**
 * Parses maybe empty value (undefined, empty string or empty buffer) as JSON.
 */
export const parseMaybeEmptyValueAsJson = <Return>(value: unknown): Return | undefined => {
  if (!value) {
    return undefined;
  }

  const stringValue = String(value);

  if (stringValue === '') {
    return undefined;
  }

  return JSON.parse(stringValue) as Return;
};
