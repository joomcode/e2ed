import {assertValueIsDefined} from '../asserts';
import {getKeys, setReadonlyProperty} from '../object';

import {addRequestStatistics} from './addRequestStatistics';

import type {ApiStatistics, RequestStatistics} from '../../types/internal';

/**
 * Adds additional requests to total API statistics requests.
 * @internal
 */
export const addRequests = (
  targetByUrl: ApiStatistics['requests'],
  sourceByUrl: ApiStatistics['requests'],
): void => {
  for (const url of getKeys(sourceByUrl)) {
    const sourceByMethod = sourceByUrl[url];

    assertValueIsDefined(sourceByMethod, 'sourceByMethod is defined', {sourceByUrl, url});

    let targetByMethod = targetByUrl[url];

    targetByMethod ??= setReadonlyProperty(targetByUrl, url, Object.create(null) as {});

    for (const method of getKeys(sourceByMethod)) {
      const sourceByStatusCode: RequestStatistics | undefined = sourceByMethod[method];

      assertValueIsDefined(sourceByStatusCode, 'sourceByStatusCode is defined', {method, url});

      let targetByStatusCode = targetByMethod[method];

      if (targetByStatusCode === undefined) {
        targetByStatusCode = Object.create(null) as {};
        setReadonlyProperty(targetByMethod, method, targetByStatusCode);
      }

      addRequestStatistics(targetByStatusCode, sourceByStatusCode);
    }
  }
};
