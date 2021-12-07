import type {TestMeta} from './userland';
import type {Brand, DeepReadonly} from './utils';

/**
 * Unique id of each test run.
 */
export type RunId = Brand<string, 'RunId'>;

/**
 * Test options.
 */
export type TestOptions = DeepReadonly<{
  meta: TestMeta;
}>;
