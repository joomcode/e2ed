import {t as testController} from 'testcafe';

type Get<T> = () => T | undefined;
type Set<T> = (value: T) => void;
type Clear = () => void;

let callCount = 0;

/**
 * Creates function for get, set and clear some typed value in test context.
 */
export const useContext = <T>(): [Get<T>, Set<T>, Clear] => {
  callCount += 1;

  const contextIndex = callCount;

  const get: Get<T> = () => (testController.ctx.contexts as Record<number, T>)?.[contextIndex];

  const set: Set<T> = (value) => {
    if (testController.ctx.contexts === undefined) {
      testController.ctx.contexts = {};
    }

    (testController.ctx.contexts as Record<number, T>)[contextIndex] = value;
  };

  const clear: Clear = () => set(undefined as unknown as T);

  return [get, set, clear];
};
