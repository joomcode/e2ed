import type {HeaderEntry, Headers, Mutable} from '../../types/internal';

/**
 * Get headers object from array of header entries.
 */
export const getHeadersFromHeaderEntries = (headerEntries: readonly HeaderEntry[]): Headers => {
  const headers: Mutable<Headers> = {};

  for (const {name, value} of headerEntries) {
    const lowerCaseName = name.toLowerCase();

    if (lowerCaseName in headers) {
      const previousValue = headers[lowerCaseName];

      if (Array.isArray(previousValue)) {
        previousValue.push(value);
      } else if (previousValue === undefined) {
        headers[lowerCaseName] = value;
      } else {
        headers[lowerCaseName] = [previousValue, value];
      }

      continue;
    }

    headers[lowerCaseName] = value;
  }

  return headers;
};
