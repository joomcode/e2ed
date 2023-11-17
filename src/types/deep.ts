import type {IsBrand} from './brand';

/**
 * Mutable type with recursive applying.
 * `DeepMutable<{readonly foo: {readonly bar: 0}}>` = `{foo: {bar: 0}}`.
 */
export type DeepMutable<Type> = keyof Type extends never
  ? Type
  : IsBrand<Type> extends true
    ? Type
    : {-readonly [Key in keyof Type]: DeepMutable<Type[Key]>};

/**
 * Partial type with recursive applying.
 * `DeepPartial<{foo: {bar: 0}}>` = `{foo?: {bar?: 0}}`.
 */
export type DeepPartial<Type> = keyof Type extends never
  ? Type
  : IsBrand<Type> extends true
    ? Type
    : {[Key in keyof Type]?: DeepPartial<Type[Key]>};

/**
 * Readonly type with recursive applying.
 * `DeepReadonly<{foo: {bar: 0}}>` = `{readonly foo: {readonly bar: 0}}`.
 */
export type DeepReadonly<Type> = keyof Type extends never
  ? Type
  : IsBrand<Type> extends true
    ? Type
    : {readonly [Key in keyof Type]: DeepReadonly<Type[Key]>};

/**
 * Required type with recursive applying.
 * `DeepRequired<{foo?: {bar?: 0}}>` = `{foo: {bar: 0}}`.
 */
export type DeepRequired<Type> = keyof Type extends never
  ? Type
  : IsBrand<Type> extends true
    ? Type
    : {[Key in keyof Type]-?: DeepRequired<Exclude<Type[Key], undefined>>};
