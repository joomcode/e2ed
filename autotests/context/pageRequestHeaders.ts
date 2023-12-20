import {useContext} from 'e2ed';

import type {Headers} from 'e2ed/types';

/**
 * Get, set and clear additional page request headers, that will be added when navigating to the page.
 */
export const [getPageRequestHeaders, setPageRequestHeaders, clearPageRequestHeaders] =
  useContext<Headers>();
