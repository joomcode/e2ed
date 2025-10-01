import {parseMaybeEmptyValueAsJson} from './parseMaybeEmptyValueAsJson';

type Return = Readonly<{hasParseError: boolean; value: unknown}>;

/**
 * Parses `unknown` value as JSON, if needed.
 * If `isValueInJsonFormat` is `true`, then parses value as JSON and saves parse error.
 * If `isValueInJsonFormat` is `false`, then returns value as is.
 * If `isValueInJsonFormat` is `undefined`, then safely tries to parse value as JSON.
 */
export const parseValueAsJsonIfNeeded = (
  originalValue: unknown,
  isValueInJsonFormat?: boolean,
): Return => {
  let hasParseError = false;
  let value = originalValue;

  if (isValueInJsonFormat === true) {
    try {
      value = parseMaybeEmptyValueAsJson(originalValue);
    } catch {
      hasParseError = true;
    }
  } else if (isValueInJsonFormat !== false) {
    try {
      value = parseMaybeEmptyValueAsJson(originalValue);
    } catch {}
  }

  return {hasParseError, value};
};
