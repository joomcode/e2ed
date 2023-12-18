import {testController} from './testController';

type Context<Type> = {contexts: Record<number, Type>};

type Get<Type> = (this: void) => Type | undefined;
type GetWithDefaultValue<Type> = (this: void) => Type;
type Set<Type> = (this: void, value: Type) => void;
type Clear = (this: void) => void;

type UseContext = (<Type>() => [get: Get<Type>, set: Set<Type>, clear: Clear]) &
  (<Type>(defaultValue: Type) => [get: GetWithDefaultValue<Type>, set: Set<Type>, clear: Clear]);

let callCount = 0;

/**
 * Creates functions for `get`, `set` and `clear` some typed value in test context.
 */
export const useContext = (<Type>(defaultValue?: Type) => {
  callCount += 1;

  const contextIndex = callCount;

  /**
   * Set value to test context.
   */
  const set = (value: Type): void => {
    if ((testController.ctx as Partial<Context<Type>>).contexts === undefined) {
      (testController.ctx as Partial<Context<Type>>).contexts = {};
    }

    const {contexts} = testController.ctx as Context<Type>;

    contexts[contextIndex] = value;
  };

  /**
   * Clear value in test context (set value to `undefined`).
   */
  const clear = (): void => set(undefined as unknown as Type);

  if (defaultValue === undefined) {
    /**
     * Get value from test context.
     */
    const get = (): Type | undefined => {
      const {contexts}: Partial<Context<Type>> = testController.ctx;

      return contexts?.[contextIndex];
    };

    return [get, set, clear];
  }

  /**
   * Get value from test context (or default value, if it is `undefined`).
   */
  const getWithDefaultValue = (): Type => {
    const {contexts}: Partial<Context<Type>> = testController.ctx;

    return contexts?.[contextIndex] ?? defaultValue;
  };

  return [getWithDefaultValue, set, clear];
}) as UseContext;
