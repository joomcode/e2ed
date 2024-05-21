import {parse} from 'node:querystring';

import type {Query} from '../../types/internal';

/**
 * Get `query` of request by url search string.
 * @internal
 */
export const getQuery = (searchString: string): Query =>
  parse(searchString ? searchString.slice(1) : '');
