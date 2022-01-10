import type {Brand} from './brand';

/**
 * Label string for test run with additional data.
 */
export type RunLabel = Brand<string, 'RunLabel'>;

/**
 * Unique id of each test run.
 */
export type RunLabelObject = Readonly<{
  concurrency: number;
  maxRetry: number;
  retry: number;
}>;
