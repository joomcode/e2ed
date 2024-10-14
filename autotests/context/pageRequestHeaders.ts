import {useContext} from 'e2ed';

import type {ClearContext, GetContext, Headers, SetContext} from 'e2ed/types';

const [get, set, clear] = useContext<Headers>();

/**
 * Get additional page request headers, that will be added when navigating to the page.
 */
export const getPageRequestHeaders: GetContext<Headers> = get;

/**
 * Set additional page request headers, that will be added when navigating to the page.
 */
export const setPageRequestHeaders: SetContext<Headers> = set;

/**
 * Clear additional page request headers, that will be added when navigating to the page.
 */
export const clearPageRequestHeaders: ClearContext = clear;
