import {createTestFunction} from 'e2ed/createTestFunction';

import {config} from './config';
import * as hooks from './hooks';

/**
 * Test function that describes the test or the task
 * (test does not necessarily contain checks).
 */
export const it = createTestFunction({config, hooks});
