import {assertValueIsDefined} from '../asserts';
import {getKeys, setReadonlyProperty} from '../object';

import type {ApiStatistics, PageStatistics} from '../../types/internal';

/**
 * Add additional pages to total API statistics pages.
 * @internal
 */
export const addPages = (
  targetByPageName: ApiStatistics['pages'],
  sourceByPageName: ApiStatistics['pages'],
): void => {
  for (const pageName of getKeys(sourceByPageName)) {
    const sourceByUrl = sourceByPageName[pageName];

    assertValueIsDefined(sourceByUrl, 'sourceByUrl is defined', {pageName, sourceByPageName});

    let targetByUrl = targetByPageName[pageName];

    targetByUrl ??= setReadonlyProperty(targetByPageName, pageName, Object.create(null) as {});

    for (const url of getKeys(sourceByUrl)) {
      const sourceStatistics: PageStatistics | undefined = sourceByUrl[url];

      assertValueIsDefined(sourceStatistics, 'sourceStatistics is defined', {pageName, url});

      let targetStatistics = targetByUrl[url];

      targetStatistics ??= setReadonlyProperty(targetByUrl, url, {count: 0, duration: 0});

      setReadonlyProperty(
        targetStatistics,
        'count',
        targetStatistics.count + sourceStatistics.count,
      );

      setReadonlyProperty(
        targetStatistics,
        'duration',
        targetStatistics.duration + sourceStatistics.duration,
      );
    }
  }
};
