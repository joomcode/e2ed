import {assertValueIsDefined} from '../asserts';
import {getKeys, setReadonlyProperty} from '../object';

import type {ApiStatistics, RequestStatistics, StatisticsUnit} from '../../types/internal';

/**
 * Add additional API statistics to main API statistics.
 * @internal
 */
export const addApiStatistics = (target: ApiStatistics, source: ApiStatistics): void => {
  const sourceByUrl = source.requests;
  const targetByUrl = target.requests;

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

      for (const statusCode of getKeys(sourceByStatusCode)) {
        const sourceUnit: StatisticsUnit | undefined = sourceByStatusCode[statusCode];

        assertValueIsDefined(sourceUnit, 'sourceUnit is defined', {method, statusCode, url});

        let targetUnit = targetByStatusCode[statusCode];

        // eslint-disable-next-line max-depth
        if (targetUnit === undefined) {
          targetUnit = {count: 0, duration: 0, size: 0};
          setReadonlyProperty(targetByStatusCode, statusCode, targetUnit);
        }

        setReadonlyProperty(targetUnit, 'count', targetUnit.count + sourceUnit.count);
        setReadonlyProperty(targetUnit, 'duration', targetUnit.duration + sourceUnit.duration);
        setReadonlyProperty(targetUnit, 'size', targetUnit.size + sourceUnit.size);
      }
    }
  }
};
