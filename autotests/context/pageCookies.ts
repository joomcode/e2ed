import {useContext} from 'e2ed';

import type {ClearContext, Cookie, GetContext, SetContext} from 'e2ed/types';

type Cookies = readonly Cookie[];

const [get, set, clear] = useContext<Cookies>();

/**
 * Get page cookies, that will be added when navigating to the page.
 */
export const getPageCookies: GetContext<Cookies> = get;

/**
 * Set page cookies, that will be added when navigating to the page.
 */
export const setPageCookies: SetContext<Cookies> = set;

/**
 * Clear page cookies, that will be added when navigating to the page.
 */
export const clearPageCookies: ClearContext = clear;
