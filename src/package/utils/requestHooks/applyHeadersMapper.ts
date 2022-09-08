import type {Headers, MapHeaders, Mutable} from '../../types/internal';

const getCopyOfHeaders = (headers: Headers): Headers => {
  const copyOfHeaders = {...headers};

  for (const [key, value] of Object.entries(copyOfHeaders)) {
    if (Array.isArray(value)) {
      copyOfHeaders[key] = [...value];
    }
  }

  return copyOfHeaders;
};

/**
 * Map exists headers to new headers and merge this new headers to exists headers.
 * @internal
 */
export const applyHeadersMapper = (headers: Headers, mapper?: MapHeaders): void => {
  if (mapper === undefined) {
    return;
  }

  const copyOfHeaders = getCopyOfHeaders(headers);
  const newHeaders = mapper(copyOfHeaders);
  const mutableHeaders: Mutable<Headers> = headers;

  for (const [key, value] of Object.entries(newHeaders)) {
    if (value === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete mutableHeaders[key];
    } else {
      mutableHeaders[key] = value;
    }
  }
};
