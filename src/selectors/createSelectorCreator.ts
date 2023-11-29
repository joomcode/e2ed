import {Selector} from 'testcafe-without-typecheck';

import {DESCRIPTION_KEY} from '../constants/internal';
import {setReadonlyProperty} from '../utils/setReadonlyProperty';

import type {
  CreateSelector,
  Fn,
  Selector as SelectorType,
  SelectorCustomMethods,
  TestCafeSelector,
  Values,
} from '../types/internal';

/**
 * Proxy handler for wrapping all selector properties.
 */
const createGet = (
  customMethods: SelectorCustomMethods,
): Required<ProxyHandler<SelectorType>>['get'] => {
  const get: Required<ProxyHandler<SelectorType>>['get'] = (target, property, receiver) => {
    const customMethod =
      typeof property === 'string'
        ? customMethods[property as keyof SelectorCustomMethods]
        : undefined;

    let result = (
      customMethod
        ? customMethod.bind(target as unknown as TestCafeSelector)
        : Reflect.get(target, property, receiver)
    ) as Values<SelectorType> & {[DESCRIPTION_KEY]?: string};

    if (typeof property === 'symbol') {
      return result;
    }

    if ((typeof result !== 'object' || result === null) && typeof result !== 'function') {
      return result;
    }

    if (typeof result === 'function') {
      const originalFunction = result as Fn;

      result = // eslint-disable-next-line no-restricted-syntax
        function selectorMethodWrapper(this: SelectorType, ...args: never[]) {
          const callResult = originalFunction.apply(this, args);

          if (
            (typeof callResult !== 'object' || callResult === null) &&
            typeof callResult !== 'function'
          ) {
            return callResult;
          }

          const callDescription = `${result[DESCRIPTION_KEY]}(${args.join(', ')})`;

          (callResult as typeof result)[DESCRIPTION_KEY] = callDescription;

          // callResult is Selector
          if (Object.prototype.hasOwnProperty.call(callResult, 'getBoundingClientRectProperty')) {
            return new Proxy(callResult, {get});
          }

          return callResult;
        } as typeof result;
    }

    const description = target[DESCRIPTION_KEY] || '';

    result[DESCRIPTION_KEY] = `${description}.${property}`;

    return result;
  };

  return get;
};

/**
 * Creates `createSelector` function.
 * @internal
 */
export const createSelectorCreator = (customMethods: SelectorCustomMethods): CreateSelector => {
  const createSelector: CreateSelector = (...args) => {
    const locator = args[0];
    const selector = Selector(...args) as unknown as SelectorType;

    if (typeof locator === 'string') {
      setReadonlyProperty(selector, DESCRIPTION_KEY, locator);
    }

    return new Proxy(selector, {get: createGet(customMethods)});
  };

  return createSelector;
};
