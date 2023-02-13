import {createProjectApi} from 'e2ed';

import * as hooks from './hooks';

import type {TestMeta} from 'autotests/types';
import type {Pack} from 'autotests/types/pack';

/**
 * Test function that describes the test or the task
 * (test does not necessarily contain checks), and getFullPackconfig function.
 * that return the full pack configuration object.
 */
export const {getFullPackConfig, test: it} = createProjectApi<TestMeta, Pack>(hooks);
