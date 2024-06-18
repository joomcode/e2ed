/**
 * `void` or `Promise<void>` as return value for maybe async functions.
 */
export type AsyncVoid = MaybePromise<void>;

/**
 * A value of a type `Type` that may be wrapped in a promise.
 */
export type MaybePromise<Type> = Promise<Type> | Type;

/**
 * Thenable object, that is, an object with a `then` method.
 */
export type Thenable = Readonly<{
  then: Promise<unknown>['then'];
}>;
