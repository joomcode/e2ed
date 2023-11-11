/**
 * `void` or `Promise<void>` as return value for maybe async functions.
 */
export type AsyncVoid = MaybePromise<void>;

/**
 * A value of a type `Type` that may be wrapped in a promise.
 */
export type MaybePromise<Type> = Type | Promise<Type>;

/**
 * If the type is a promise, unwraps it and returns the promise value type
 * (until a non-promise value is obtained).
 * `UnwrapPromise<number>` = `number`.
 * `UnwrapPromise<Promise<string>>` = `string`.
 * `UnwrapPromise<Promise<Promise<bigint>>>` = `bigint`.
 */
export type UnwrapPromise<Type> = Type extends Promise<infer Value> ? UnwrapPromise<Value> : Type;
