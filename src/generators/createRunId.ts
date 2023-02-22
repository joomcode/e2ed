import {getRandomId} from './getRandomId';

import type {RunId} from '../types/internal';

/**
 * Creates new RunId for TestRun.
 * @internal
 */
export const createRunId = (): RunId => getRandomId().replace(/:/g, '-') as RunId;
