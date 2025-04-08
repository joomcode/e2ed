import {randomUUID} from 'node:crypto';

import {getHash} from '../getHash';
import {isUiMode} from '../uiMode';

import type {RunId, Test} from '../../types/internal';

/**
 * Creates new `RunId` for test run.
 * @internal
 */
export const createRunId = (test: Test, retryIndex: number): RunId => {
  const data = {...test, testFn: test.testFn.toString()};
  const text = JSON.stringify(data);

  const base = getHash(isUiMode ? randomUUID() : text);

  return `${base}-${retryIndex}` as RunId;
};
