import {useContext} from '../useContext';
import {assertValueIsDefined} from '../utils/asserts';

import type {RunId} from '../types/internal';

const [getRawRunId, setRunId] = useContext<RunId>();

/**
 * Get test runId.
 */
export const getRunId = (): RunId => {
  const runId = getRawRunId();

  assertValueIsDefined(runId);

  return runId;
};

export {setRunId};
