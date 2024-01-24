import {addHeaderToEntries} from './addHeaderToEntries';
import {getCopyOfHeaders} from './getCopyOfHeaders';
import {removeHeaderFromEntries} from './removeHeaderFromEntries';

import type {HeaderEntry, Headers, MapHeaders} from '../../types/internal';

/**
 * Map exists headers to new headers and merge this new headers to exists header entries on CDP mode.
 * @internal
 */
export const applyHeadersMapperOnCdpMode = (
  headers: Headers,
  mapper: MapHeaders,
  headerEntries: HeaderEntry[],
): void => {
  const copyOfHeaders = getCopyOfHeaders(headers);
  const newHeaders = mapper(copyOfHeaders);

  for (const [name, value] of Object.entries(newHeaders)) {
    if (value === undefined) {
      removeHeaderFromEntries(headerEntries, name);
    } else {
      addHeaderToEntries(headerEntries, name, value);
    }
  }
};
