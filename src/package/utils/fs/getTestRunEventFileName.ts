import type {RunId} from '../../types/internal';

/**
 * Get test run event file name by runId.
 * @internal
 */
export const getTestRunEventFileName = (runId: RunId): string => `${runId}.json`;
