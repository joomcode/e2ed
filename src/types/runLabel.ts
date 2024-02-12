import type {Brand} from './brand';

/**
 * Label string for test run with additional data.
 * Not internal because it's part of `TestRun` type, used in userland hooks.
 */
export type RunLabel = Brand<string, 'RunLabel'>;

/**
 * Additional data parsed from `RunLabel` string.
 * Not internal because runLabel is a part of `TestRun` type, used in userland hooks.
 */
export type RunLabelObject = Readonly<{
  concurrency: number;
  disconnectedBrowsersCount: number;
  maxRetriesCount: number;
  retryIndex: number;
}>;

/**
 * Raw additional data parsed from `RunLabel` string (from match).
 * @internal
 */
export type RawRunLabelObject = {
  [K in keyof RunLabelObject]: string;
};
