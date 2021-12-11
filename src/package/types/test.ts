import type {Brand} from './brand';
import type {DeepReadonly} from './deep';
import type {TestMeta} from './userland';

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
