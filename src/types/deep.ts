import type {IsBrand} from './brand';

/**
 * Mutable type with recursive applying.
 * DeepMutable<{readonly foo: {readonly bar: 0}}> = {foo: {bar: 0}}.
 */
export type DeepMutable<T> = keyof T extends never
  ? T
  : IsBrand<T> extends true
  ? T
  : {-readonly [K in keyof T]: DeepMutable<T[K]>};

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

/**
 * Required type with recursive applying.
 * DeepRequired<{foo?: {bar?: 0}}> = {foo: {bar: 0}}.
 */
export type DeepRequired<T> = keyof T extends never
  ? T
  : IsBrand<T> extends true
  ? T
  : {[K in keyof T]-?: DeepRequired<Exclude<T[K], undefined>>};
