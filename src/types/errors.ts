import type {LogParams} from './log';
import type {RunLabel} from './runLabel';

/**
 * Printed fields of `E2edError` instances for `toJSON`, `toString` and `inspect.custom` methods.
 */
export type E2edPrintedFields = Readonly<{
  dateTimeInIso: string;
  message: string;
  params: LogParams | undefined;
  runLabel: RunLabel | undefined;
  stackTrace: readonly string[];
}>;

/**
 * Maybe error params with optional field `isTestRunBroken` (or `undefined`).
 * The presence of such a field in a reject error results in
 * setting the test run status to a `broken`.
 * @internal
 */
export type MaybeWithIsTestRunBroken = Readonly<{isTestRunBroken: unknown}> | undefined;
