import {createTestFunction} from 'e2ed';

import {config} from './config';
import * as hooks from './hooks';

import type {SkipTests, TestMeta} from './types';

/**
 * Test function that describes the test or the task
 * (test does not necessarily contain checks).
 */
export const it = createTestFunction<TestMeta, SkipTests>({config, hooks});
