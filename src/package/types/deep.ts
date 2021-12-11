import type {IsBrand} from './brand';

/**
 * Partial type with recursive applying.
 * DeepPartial<{foo: {bar: 0}}> = {foo?: {bar?: 0}}.
 */
export type DeepPartial<T> = keyof T extends never
  ? T
  : IsBrand<T> extends true
  ? T
  : {[K in keyof T]?: DeepPartial<T[K]>};

/**
 * Readonly type with recursive applying.
 * DeepReadonly<{foo: {bar: 0}}> = {readonly foo: {readonly bar: 0}}.
 */
export type DeepReadonly<T> = keyof T extends never
  ? T
  : IsBrand<T> extends true
  ? T
  : {readonly [K in keyof T]: DeepReadonly<T[K]>};
