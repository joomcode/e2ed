import {useContext} from '../useContext';
import {assertValueIsDefined} from '../utils/asserts';

import type {RunId} from '../types/internal';

/**
 * @internal
 */
const [getRawRunId, setRunId] = useContext<RunId>();

/**
 * Get test runId.
 * @internal
 */
export const getRunId = (): RunId => {
  const runId = getRawRunId();

  assertValueIsDefined(runId, 'runId is undefined');

  return runId;
};

export {setRunId};
