import {
  ORDER_OF_TEST_RUN_STATUSES_FOR_DISPLAY,
  type TestRunStatus,
} from '../../../constants/internal';

import {assertType} from '../../asserts';

import type {Mutable} from '../../../types/internal';

type IndexByStatus = Readonly<Record<TestRunStatus, number>>;
type WithStatus = Readonly<{status: TestRunStatus}>;

const indexByStatus: Mutable<Partial<IndexByStatus>> = {};

ORDER_OF_TEST_RUN_STATUSES_FOR_DISPLAY.forEach((status, index) => {
  indexByStatus[status] = index;
});

assertType<IndexByStatus>(indexByStatus);

/**
 * Compares two objects by their `status` field in order of `TestRun` statuses for display.
 * @internal
 */
export const compareByStatuses = (a: WithStatus, b: WithStatus): number => {
  const aIndex = indexByStatus[a.status];
  const bIndex = indexByStatus[b.status];

  return aIndex - bIndex;
};
