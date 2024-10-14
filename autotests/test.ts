import {createTestFunction} from 'e2ed';

import * as hooks from './hooks';

import type {Pack, TestFunction} from 'autotests/configurator';

/**
 * Test function that describes the test or the task
 * (test does not necessarily contain checks).
 */
export const test: TestFunction = createTestFunction<Pack>(hooks);
