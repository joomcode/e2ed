import {Selector} from 'testcafe-without-typecheck';

import {LOCATOR_KEY} from './constants/internal';

import type {Fn, Selector as SelectorType, Values} from './types/internal';

/**
 * Proxy handler for wrapping all selector properties.
 */
const get: ProxyHandler<SelectorType>['get'] = (
  target,
  property,
  receiver,
): Values<SelectorType> => {
  const result = Reflect.get(target, property, receiver) as Values<SelectorType>;

  if (typeof property === 'symbol') {
    return result;
  }

  // @ts-expect-error: native Selector type does not have LOCATOR_KEY
  const locator: unknown = target[LOCATOR_KEY];

  if (typeof locator !== 'string') {
    return result;
  }

  if ((typeof result !== 'object' || result === null) && typeof result !== 'function') {
    return result;
  }

  const withWrapper =
    typeof result === 'function'
      ? // eslint-disable-next-line no-restricted-syntax
        (function selectorMethodWrapper(this: SelectorType, ...args: never[]) {
          const callResult = (result as Fn).apply(this, args);

          if (
            (typeof callResult === 'object' && callResult !== null) ||
            typeof callResult === 'function'
          ) {
            Object.defineProperty(callResult, LOCATOR_KEY, {
              configurable: true,
              enumerable: true,
              value: locator,
              writable: true,
            });
          }

          return callResult;
        } as typeof result)
      : result;

  void Object.defineProperty(withWrapper, LOCATOR_KEY, {
    configurable: true,
    enumerable: true,
    value: locator,
    writable: true,
  });

  return withWrapper;
};

/**
 * Creates selector by locator and optional parameters.
 */
export const createSelector = (...args: Parameters<typeof Selector>): SelectorType => {
  const locator = args[0];
  const selector = Selector(...args);

  if (typeof locator !== 'string') {
    return selector;
  }

  // @ts-expect-error: native Selector type does not have LOCATOR_KEY
  selector[LOCATOR_KEY] = locator;

  return new Proxy(selector, {get});
};
