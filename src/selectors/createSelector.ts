import {Selector} from 'testcafe-without-typecheck';

import {DESCRIPTION_KEY} from '../constants/internal';

import type {
  CreateSelector,
  Fn,
  RawSelector,
  SelectorCustomMethods,
  Values,
} from '../types/internal';

/**
 * Proxy handler for wrapping all selector properties.
 */
const createGet = <CustomMethods extends SelectorCustomMethods = {}>(
  customMethods?: CustomMethods,
): Required<ProxyHandler<RawSelector<CustomMethods>>>['get'] => {
  const get: Required<ProxyHandler<RawSelector<CustomMethods>>>['get'] = (
    target,
    property,
    receiver,
  ) => {
    const customMethod =
      customMethods && typeof property === 'string' ? customMethods[property] : undefined;

    let result = (
      customMethod ? customMethod.bind(target) : Reflect.get(target, property, receiver)
    ) as Values<RawSelector<CustomMethods>> & {
      [DESCRIPTION_KEY]?: string;
    };

    if (typeof property === 'symbol') {
      return result;
    }

    if ((typeof result !== 'object' || result === null) && typeof result !== 'function') {
      return result;
    }

    if (typeof result === 'function') {
      const originalFunction = result as Fn;

      result = // eslint-disable-next-line no-restricted-syntax
        function selectorMethodWrapper(this: RawSelector, ...args: never[]) {
          const callResult = originalFunction.apply(this, args);

          if (
            (typeof callResult !== 'object' || callResult === null) &&
            typeof callResult !== 'function'
          ) {
            return callResult;
          }

          const callLocator = `${result[DESCRIPTION_KEY]}(${args.join(', ')})`;

          (callResult as typeof result)[DESCRIPTION_KEY] = callLocator;

          // callResult is Selector
          if (Object.prototype.hasOwnProperty.call(callResult, 'getBoundingClientRectProperty')) {
            return new Proxy(callResult, {get});
          }

          return callResult;
        } as typeof result;
    }

    const locator = target[DESCRIPTION_KEY] || '';

    result[DESCRIPTION_KEY] = `${locator}.${property}`;

    return result;
  };

  return get;
};

export const createSelectorCreator = <CustomMethods extends SelectorCustomMethods = {}>(
  customMethods?: CustomMethods,
): CreateSelector<CustomMethods> => {
  const createSelector: CreateSelector<CustomMethods> = (...args) => {
    const locator = args[0];
    const selector = Selector(...args) as RawSelector<CustomMethods>;

    if (typeof locator === 'string') {
      selector[DESCRIPTION_KEY] = locator;
    }

    return new Proxy(selector, {get: createGet(customMethods)});
  };

  return createSelector;
};
