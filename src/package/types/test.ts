import type {TestMeta} from './userland';
import type {Brand} from './utils';

/**
 * Unique id of each test run.
 */
export type RunId = Brand<string, 'RunId'>;

/**
 * Test options.
 */
export type TestOptions = Readonly<{
  meta: TestMeta;
}>;
