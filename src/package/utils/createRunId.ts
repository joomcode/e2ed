import {getRandomId} from './getRandomId';

import type {RunId} from '../types/internal';

/**
 * Create new RunId for TestRun.
 * @internal
 */
export const createRunId = (): RunId => getRandomId().replace(/:/g, '-') as RunId;
