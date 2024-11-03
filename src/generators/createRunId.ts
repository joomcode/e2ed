import {createHash} from 'node:crypto';

import type {RunId, Test} from '../types/internal';

const runIdBaseLength = 10;

/**
 * Creates new RunId for TestRun.
 * @internal
 */
export const createRunId = (test: Test, retryIndex: number): RunId => {
  const data = {...test, testFn: test.testFn.toString()};
  const text = JSON.stringify(data);
  const hash = createHash('sha1');

  hash.update(text);

  const base = hash.digest('base64url').slice(0, runIdBaseLength);

  return `${base}-${retryIndex}` as RunId;
};
