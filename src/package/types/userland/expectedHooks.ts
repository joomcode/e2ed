import type {LogEventType} from '../../constants/internal';

import type {Url} from '../http';
import type {LogContext, LogPayload} from '../log';
import type {IsTestSkipped} from '../skipTest';
import type {RunHash, TestRun, TestStaticOptions} from '../testRun';

/**
 * Hooks type that the e2ed/hooks userland module must correspond to.
 */
export type ExpectedHooks = {
  getLogContext(
    message: string,
    payload: LogPayload | undefined,
    type: LogEventType,
  ): LogContext | undefined;
  getMainTestRunParams(testRun: TestRun): string;
  getTestRunHash(testRun: TestRun): RunHash;
  isTestSkipped(testStaticOptions: TestStaticOptions): IsTestSkipped;
  navigateTo(url: Url): Promise<void>;
};
