import {useContext} from '../useContext';
import {assertValueIsDefined, assertValueIsUndefined} from '../utils/asserts';

import type {RunId} from '../types/internal';

/**
 * Raw versions of getRunId and setRunId.
 * @internal
 */
const [getRawRunId, setRawRunId] = useContext<RunId>();

/**
 * Get test runId.
 * @internal
 */
export const getRunId = (): RunId => {
  const runId = getRawRunId();

  assertValueIsDefined(runId, 'runId is defined');

  return runId;
};

/**
 * Set test runId (can only be called once).
 * @internal
 */
export const setRunId: typeof setRawRunId = (runId) => {
  const currentRunId = getRawRunId();

  assertValueIsUndefined(currentRunId, 'currentRunId is not defined', {currentRunId, runId});

  return setRawRunId(runId);
};
