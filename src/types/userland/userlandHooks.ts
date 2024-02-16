import type {LogEventType} from '../../constants/internal';

import type {LogContext, LogPayload} from '../log';
import type {IsTestSkippedResult} from '../skipTest';
import type {RunHash, TestRun, TestStaticOptions} from '../testRun';

import type {TestMetaPlaceholder} from './placeholders';

/**
 * Hooks type that the e2ed/hooks userland module must correspond to.
 */
export type UserlandHooks<TestMeta = TestMetaPlaceholder> = {
  getLogContext: (
    this: void,
    message: string,
    payload: LogPayload | undefined,
    type: LogEventType,
  ) => LogContext | undefined;
  getMainTestRunParams: (this: void, testRun: TestRun<TestMeta>) => string;
  getTestRunHash: (this: void, testRun: TestRun<TestMeta>) => RunHash;
  isTestSkipped: (
    this: void,
    testStaticOptions: TestStaticOptions<TestMeta>,
  ) => IsTestSkippedResult;
};
