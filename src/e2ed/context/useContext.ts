import {t as testController} from 'testcafe';

type Get<T> = () => T | undefined;
type Set<T> = (value: T) => void;

let callCount = 0;

export const useContext = <T>(): [get: Get<T>, set: Set<T>] => {
  callCount += 1;

  const contextIndex = callCount;

  const get: Get<T> = () => (testController.ctx.contexts as Record<number, T>)?.[contextIndex];

  const set: Set<T> = (value) => {
    if (testController.ctx.contexts === undefined) {
      testController.ctx.contexts = {};
    }

    (testController.ctx.contexts as Record<number, T>)[contextIndex] = value;
  };

  return [get, set];
};
