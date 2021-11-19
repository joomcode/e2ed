import type {RunId} from './internal';
import type {TestMeta} from './userland';

/**
 * Test options.
 */
export type TestOptions = Readonly<{
  meta: TestMeta;
}>;

/**
 * RunTest event.
 */
export type RunTestEvent = Readonly<{
  name: string;
  options: TestOptions;
  runId: RunId;
}>;
