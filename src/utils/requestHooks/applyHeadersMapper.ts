import {getCopyOfHeaders} from './getCopyOfHeaders';
import {getEquivalentHeadersNames} from './getEquivalentHeadersNames';

import type {Headers, MapHeaders, Mutable} from '../../types/internal';

/**
 * Map exists headers to new headers and merge this new headers to exists headers.
 * @internal
 */
export const applyHeadersMapper = (headers: Headers, mapper: MapHeaders): void => {
  const copyOfHeaders = getCopyOfHeaders(headers);
  const newHeaders = mapper(copyOfHeaders);

  const mutableHeaders: Mutable<Headers> = headers;

  for (const [name, value] of Object.entries(newHeaders)) {
    if (value === undefined) {
      const equivalentNames = getEquivalentHeadersNames(mutableHeaders, name);

      for (const currentName of equivalentNames) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete mutableHeaders[currentName];
      }
    } else {
      mutableHeaders[name] = value as string[] | string | undefined;
    }
  }
};
