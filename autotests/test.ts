import {createTestFunction} from 'e2ed';

import * as hooks from './hooks';

import type {Pack} from 'autotests/types/packSpecific';

/**
 * Test function that describes the test or the task
 * (test does not necessarily contain checks).
 */
export const test = createTestFunction<Pack>(hooks);
