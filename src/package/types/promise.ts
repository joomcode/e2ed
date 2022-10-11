/**
 * Void or Promise<void> as return value for maybe async functions.
 */
export type AsyncVoid = void | Promise<void>;

/**
 * If the type is a promise, unwraps it and returns the promise value type
 * (until a non-promise value is obtained).
 * UnwrapPromise<number> = number.
 * UnwrapPromise<Promise<string>> = string.
 * UnwrapPromise<Promise<Promise<bigint>>> = bigint.
 */
export type UnwrapPromise<T> = T extends Promise<infer V> ? UnwrapPromise<V> : T;
