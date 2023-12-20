import {getCopyOfHeaders} from './getCopyOfHeaders';

import type {Headers, HeadersModifiers, MapHeaders} from '../../types/internal';

/**
 * Map exists headers to new headers and merge this new headers to exists headers,
 * using the headers modifiers.
 * @internal
 */
export const applyHeadersMapperByModifiers = (
  headers: Headers,
  mapper: MapHeaders | undefined,
  {removeHeader, setHeader}: HeadersModifiers,
): void => {
  if (mapper === undefined) {
    return;
  }

  const copyOfHeaders = getCopyOfHeaders(headers);
  const newHeaders = mapper(copyOfHeaders);

  for (const [name, value] of Object.entries(newHeaders)) {
    if (value === undefined) {
      removeHeader(name.toLowerCase());
    } else {
      setHeader(name.toLowerCase(), String(value));
    }
  }
};
