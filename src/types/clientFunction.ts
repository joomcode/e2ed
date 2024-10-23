import type {Void} from './undefined';

/**
 * Client function by arguments and return result.
 */
export type ClientFunction<Args extends readonly unknown[] = [], Result = Void> = (
  this: void,
  ...args: Args
) => Promise<Result>;
