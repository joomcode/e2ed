import type {Headers} from '../../types/internal';

/**
 * Get value of header by header name.
 */
export const getHeaderValue = <
  SomeHeaders extends Headers,
  Name extends string & keyof SomeHeaders,
>(
  headers: SomeHeaders,
  name: Name,
): SomeHeaders[Name] | undefined => {
  const allNames = Object.keys(headers);
  const lowerCaseName = name.toLowerCase();

  for (const currentName of allNames) {
    if (lowerCaseName === currentName.toLowerCase()) {
      return headers[currentName] as SomeHeaders[Name];
    }
  }

  return undefined;
};
