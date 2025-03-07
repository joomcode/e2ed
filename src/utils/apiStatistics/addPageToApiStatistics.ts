import {URL} from 'node:url';

import {getApiStatistics} from '../../context/apiStatistics';

import {addApiStatistics} from './addApiStatistics';

import type {ApiStatistics, PageName, Url} from '../../types/internal';

type Options = Readonly<{
  duration: number;
  pageName: PageName;
  url: Url;
}>;

/**
 * Add single page to API statistics.
 * @internal
 */
export const addPageToApiStatistics = ({duration, pageName, url}: Options): void => {
  const apiStatistics = getApiStatistics();
  const {origin, pathname} = new URL(url);
  const urlWithoutQuery = `${origin}${pathname}` as Url;

  const additionalApiStatistics: ApiStatistics = {
    pages: {[pageName]: {[urlWithoutQuery]: {count: 1, duration}}},
    requests: {},
  };

  addApiStatistics(apiStatistics, additionalApiStatistics);
};
