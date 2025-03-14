import {getApiStatistics} from '../../context/apiStatistics';

import {addApiStatistics} from './addApiStatistics';
import {getUrlTemplate} from './getUrlTemplate';

import type {ApiStatistics, PageName, Url} from '../../types/internal';

type Options = Readonly<{
  duration: number;
  pageName: PageName;
  url: Url;
}>;

/**
 * Adds single page to API statistics.
 * @internal
 */
export const addPageToApiStatistics = ({duration, pageName, url}: Options): void => {
  const apiStatistics = getApiStatistics();
  const {urlTemplate} = getUrlTemplate(url);

  const additionalApiStatistics: ApiStatistics = {
    pages: {[pageName]: {[urlTemplate]: {count: 1, duration}}},
    requests: {},
    resources: {},
  };

  addApiStatistics(apiStatistics, additionalApiStatistics);
};
