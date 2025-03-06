import {getEquivalentHeadersNames} from './getEquivalentHeadersNames';

import type {MapHeaders, Mutable, StringHeaders} from '../../types/internal';

/**
 * Map exists headers to new headers and merge this new headers to exists headers.
 * @internal
 */
export const applyHeadersMapper = (headers: StringHeaders, mapper: MapHeaders): void => {
  const copyOfHeaders = {...headers};
  const newHeaders = mapper(copyOfHeaders);

  const mutableHeaders: Mutable<StringHeaders> = headers;

  for (const [name, value] of Object.entries(newHeaders)) {
    if (value === undefined) {
      const equivalentNames = getEquivalentHeadersNames(mutableHeaders, name);

      for (const currentName of equivalentNames) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete mutableHeaders[currentName];
      }
    } else {
      mutableHeaders[name] = value;
    }
  }
};
