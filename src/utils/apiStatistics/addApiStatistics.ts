import {addPages} from './addPages';
import {addRequests} from './addRequests';
import {addResources} from './addResources';

import type {ApiStatistics} from '../../types/internal';

/**
 * Adds additional API statistics to total API statistics.
 * @internal
 */
export const addApiStatistics = (target: ApiStatistics, source: ApiStatistics): void => {
  addPages(target.pages, source.pages);
  addRequests(target.requests, source.requests);
  addResources(target.resources, source.resources);
};
