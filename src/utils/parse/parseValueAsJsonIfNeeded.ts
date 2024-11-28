import {parseMaybeEmptyValueAsJson} from './parseMaybeEmptyValueAsJson';

type Return = Readonly<{hasParseError: boolean; value: unknown}>;

/**
 * Parses `unknown` value as JSON, if needed.
 * If `isoValueInJsonFormat` is `true`, then parses value as JSON and saves parse error.
 * If `isoValueInJsonFormat` is `false`, then returns value as is.
 * If `isoValueInJsonFormat` is `undefined`, then safely tries to parse value as JSON.
 */
export const parseValueAsJsonIfNeeded = (
  originalValue: unknown,
  isoValueInJsonFormat?: boolean,
): Return => {
  let hasParseError = false;
  let value = originalValue;

  if (isoValueInJsonFormat === true) {
    try {
      value = parseMaybeEmptyValueAsJson(originalValue);
    } catch {
      hasParseError = true;
    }
  } else if (isoValueInJsonFormat !== false) {
    try {
      value = parseMaybeEmptyValueAsJson(originalValue);
    } catch {}
  }

  return {hasParseError, value};
};
