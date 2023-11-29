import type {ReExecutablePromise, Thenable} from '../types/internal';

/**
 * Returns `true`, if value is array, and `false` otherwise.
 */
export function isArray<Type>(value: unknown): value is Type[] {
  return Array.isArray(value);
}

/**
 * Returns `true`, if value is thenable (an object with a `then` method), and `false` otherwise.
 */
export function isThenable(value: unknown): value is Thenable {
  return value instanceof Object && 'then' in value && typeof value.then === 'function';
}

/**
 * Returns `true`, if value is reexecutable promise, and `false` otherwise.
 */
export function isReExecutablePromise<Type>(
  promise: Promise<Type>,
): promise is ReExecutablePromise<Type> {
  return isThenable(promise) && '_taskPromise' in promise;
}
