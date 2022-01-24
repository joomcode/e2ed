import type {LogEventType} from '../constants/internal';

import type {LogContext, LogPayload} from './log';
import type {Url} from './request';
import type {RunHash, TestRun} from './testRun';

/**
 * External type that the e2ed/hooks user module must correspond to.
 */
export type ExternalHooks = Readonly<{
  getLogContext(
    message: string,
    payload: LogPayload | undefined,
    type: LogEventType,
  ): LogContext | undefined;
  getMainTestRunParams(testRun: TestRun): string;
  getTestRunHash(testRun: TestRun): RunHash;
  navigateTo(url: Url): Promise<void>;
}>;
