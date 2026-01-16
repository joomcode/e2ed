import type {LogEventType} from '../constants/internal';

import type {LogPayload} from './log';
import type {MaybePromise} from './promise';
import type {Void} from './undefined';

/**
 * Body function of step.
 */
export type StepBody = () => MaybePromise<LogPayload | Void>;

/**
 * Error properties of step.
 * @internal
 */
export type StepErrorProperties = Readonly<{
  stepBody: StepBody | undefined;
  stepName: string;
  stepOptions: StepOptions;
}>;

/**
 * Options of `step` function.
 */
export type StepOptions = Readonly<{
  payload?: LogPayload;
  runPlaywrightStep?: boolean;
  skipLogs?: boolean;
  timeout?: number;
  type?: LogEventType;
}>;
