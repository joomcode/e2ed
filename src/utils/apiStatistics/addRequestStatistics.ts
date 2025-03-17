import {assertValueIsDefined} from '../asserts';
import {getKeys, setReadonlyProperty} from '../object';

import type {RequestStatistics, StatisticsUnit} from '../../types/internal';

/**
 * Adds additional requests statistics to total API resource statistics.
 * @internal
 */
export const addRequestStatistics = (
  targetByStatusCode: RequestStatistics,
  sourceByStatusCode: RequestStatistics,
): void => {
  for (const statusCode of getKeys(sourceByStatusCode)) {
    const sourceUnit: StatisticsUnit | undefined = sourceByStatusCode[statusCode];

    assertValueIsDefined(sourceUnit, 'sourceUnit is defined', {statusCode});

    let targetUnit = targetByStatusCode[statusCode];

    if (targetUnit === undefined) {
      targetUnit = {count: 0, duration: 0, size: 0};
      setReadonlyProperty(targetByStatusCode, statusCode, targetUnit);
    }

    setReadonlyProperty(targetUnit, 'count', targetUnit.count + sourceUnit.count);
    setReadonlyProperty(targetUnit, 'duration', targetUnit.duration + sourceUnit.duration);
    setReadonlyProperty(targetUnit, 'size', targetUnit.size + sourceUnit.size);
  }
};
