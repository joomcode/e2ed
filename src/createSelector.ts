import {Selector} from 'testcafe-without-typecheck';

import {DESCRIPTION_KEY} from './constants/internal';

import type {Fn, Selector as SelectorType, Values} from './types/internal';

/**
 * Proxy handler for wrapping all selector properties.
 */
const get: Required<ProxyHandler<SelectorType>>['get'] = (target, property, receiver) => {
  let result = Reflect.get(target, property, receiver) as Values<SelectorType> & {
    [DESCRIPTION_KEY]?: string;
  };

  if (typeof property === 'symbol') {
    return result;
  }

  const locator = target[DESCRIPTION_KEY] || '';

  if ((typeof result !== 'object' || result === null) && typeof result !== 'function') {
    return result;
  }

  if (typeof result === 'function') {
    const originalFunction: Fn = result;

    result = // eslint-disable-next-line no-restricted-syntax
      function selectorMethodWrapper(this: SelectorType, ...args: never[]) {
        const callResult = originalFunction.apply(this, args);

        if (
          (typeof callResult !== 'object' || callResult === null) &&
          typeof callResult !== 'function'
        ) {
          return callResult;
        }

        const callLocator = `${result[DESCRIPTION_KEY]}(${args.join(', ')})`;

        (callResult as typeof result)[DESCRIPTION_KEY] = callLocator;

        if (Object.prototype.hasOwnProperty.call(callResult, 'getBoundingClientRectProperty')) {
          return new Proxy(callResult, {get});
        }

        return callResult;
      } as typeof result;
  }

  result[DESCRIPTION_KEY] = `${locator}.${property}`;

  return result;
};

/**
 * Creates selector by locator and optional parameters.
 */
export const createSelector = (...args: Parameters<typeof Selector>): SelectorType => {
  const locator = args[0];
  const selector = Selector(...args) as SelectorType;

  if (typeof locator !== 'string') {
    return selector;
  }

  selector[DESCRIPTION_KEY] = locator;

  return new Proxy(selector, {get});
};
