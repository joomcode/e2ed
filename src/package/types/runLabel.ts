import type {Brand} from './brand';

/**
 * Label string for test run with additional data.
 */
export type RunLabel = Brand<string, 'RunLabel'>;

/**
 * Additional data parsed from RunLabel string.
 * @internal
 */
export type RunLabelObject = Readonly<{
  concurrency: number;
  maxRetriesCount: number;
  retryIndex: number;
}>;
