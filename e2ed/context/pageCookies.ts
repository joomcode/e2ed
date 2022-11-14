import {useContext} from 'e2ed';

import type {Cookie} from 'e2ed/types';

/**
 * Get, set and clear page cookies, that will be added when navigating to the page.
 */
export const [getPageCookies, setPageCookies, clearPageCookies] = useContext<readonly Cookie[]>();
