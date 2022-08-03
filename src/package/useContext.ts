import {testController} from './testController';

type Ctx<T> = {contexts: Record<number, T>};

type Get<T> = () => T | undefined;
type GetWithDefaultValue<T> = () => T;
type Set<T> = (value: T) => void;
type Clear = () => void;

type UseContext = (<T>() => [get: Get<T>, set: Set<T>, clear: Clear]) &
  (<T>(defaultValue: T) => [get: GetWithDefaultValue<T>, set: Set<T>, clear: Clear]);

let callCount = 0;

/**
 * Creates functions for get, set and clear some typed value in test context.
 */
export const useContext = (<T>(defaultValue?: T) => {
  callCount += 1;

  const contextIndex = callCount;

  /**
   * Set value to test context.
   */
  const set = (value: T): void => {
    if ((testController.ctx as Partial<Ctx<T>>).contexts === undefined) {
      (testController.ctx as Partial<Ctx<T>>).contexts = {};
    }

    const {contexts} = testController.ctx as Ctx<T>;

    contexts[contextIndex] = value;
  };

  /**
   * Clear value in test context (set value to undefined).
   */
  const clear = (): void => set(undefined as unknown as T);

  if (defaultValue === undefined) {
    /**
     * Get value from test context.
     */
    const get = (): T | undefined => {
      const {contexts}: Partial<Ctx<T>> = testController.ctx;

      return contexts?.[contextIndex];
    };

    return [get, set, clear];
  }

  /**
   * Get value from test context (or default value, if it is undefined).
   */
  const getWithDefaultValue = (): T => {
    const {contexts}: Partial<Ctx<T>> = testController.ctx;

    return contexts?.[contextIndex] ?? defaultValue;
  };

  return [getWithDefaultValue, set, clear];
}) as UseContext;
