import type {Thenable} from '../types/internal';

/**
 * Returns `true`, if value is array, and `false` otherwise.
 */
export function isArray<Type>(value: unknown): value is Type[] {
  return Array.isArray(value);
}

/**
 * Returns `true`, if value is thenable (an object with a `then` method), and `false` otherwise.
 */
export function isThenable<Type>(value: Type): value is Type & Thenable {
  return value instanceof Object && 'then' in value && typeof value.then === 'function';
}
