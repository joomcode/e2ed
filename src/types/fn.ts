import type {MergeTuples} from './tuples';

/**
 * Function by argument, return type, and this (context) type.
 */
export type Fn<
  Args extends readonly unknown[] = readonly never[],
  Return = unknown,
  This = unknown,
> = (this: This, ...args: Args) => Return;

/**
 * Merge (union) multiple functions in a broad sense
 * (union arguments on all positions and union return value).
 * `MergeFunctions<((a: 0) => 2) | ((b: 1) => 3)>` = `(a: 0 | 1) => 2 | 3`.
 */
export type MergeFunctions<Functions extends Fn> = Fn<
  MergeTuples<Parameters<Functions>>,
  ReturnType<Functions>
>;
