import {getHash} from '../utils/getHash';

import type {RunId, Test} from '../types/internal';

/**
 * Creates new RunId for TestRun.
 * @internal
 */
export const createRunId = (test: Test, retryIndex: number): RunId => {
  const data = {...test, testFn: test.testFn.toString()};
  const text = JSON.stringify(data);

  const base = getHash(text);

  return `${base}-${retryIndex}` as RunId;
};
