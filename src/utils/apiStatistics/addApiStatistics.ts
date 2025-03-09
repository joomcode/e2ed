import {addPages} from './addPages';
import {addRequests} from './addRequests';

import type {ApiStatistics} from '../../types/internal';

/**
 * Add additional API statistics to total API statistics.
 * @internal
 */
export const addApiStatistics = (target: ApiStatistics, source: ApiStatistics): void => {
  const sourceByPageName = source.pages;
  const targetByPageName = target.pages;

  addPages(targetByPageName, sourceByPageName);

  const sourceByUrl = source.requests;
  const targetByUrl = target.requests;

  addRequests(targetByUrl, sourceByUrl);
};
