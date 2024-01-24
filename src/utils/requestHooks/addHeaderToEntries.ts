import type {HeaderEntry} from '../../types/internal';

/**
 * Adds header to header entries by header name and header value.
 * @internal
 */
export const addHeaderToEntries = (
  headerEntries: HeaderEntry[],
  headerName: string,
  headerValue: string[] | string,
): void => {
  const values = Array.isArray(headerValue) ? headerValue : [headerValue];

  for (const value of values) {
    headerEntries.push({name: headerName, value});
  }
};
