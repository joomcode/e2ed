import {assertValueIsDefined} from '../asserts';
import {getKeys, setReadonlyProperty} from '../object';

import {addRequestStatistics} from './addRequestStatistics';

import type {ApiStatistics} from '../../types/internal';

/**
 * Adds additional resources to total API statistics resources.
 * @internal
 */
export const addResources = (
  targetByUrl: ApiStatistics['resources'],
  sourceByUrl: ApiStatistics['resources'],
): void => {
  for (const url of getKeys(sourceByUrl)) {
    const sourceByStatusCode = sourceByUrl[url];

    assertValueIsDefined(sourceByStatusCode, 'sourceByStatusCode is defined', {
      sourceByUrl,
      url,
    });

    let targetByStatusCode = targetByUrl[url];

    targetByStatusCode ??= setReadonlyProperty(targetByUrl, url, Object.create(null) as {});

    addRequestStatistics(targetByStatusCode, sourceByStatusCode);
  }
};
