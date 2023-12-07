import {DESCRIPTION_KEY} from '../../constants/internal';

import type {
  Fn,
  Selector,
  SelectorCustomMethods,
  TestCafeSelector,
  Values,
} from '../../types/internal';

type Return = Required<ProxyHandler<Selector>>['get'];

/**
 * Creates "get" trap for proxy handler for wrapping all selector properties.
 * @internal
 */
export const createGetTrap = (customMethods: SelectorCustomMethods): Return => {
  const get: Return = (target, property, receiver) => {
    const customMethod =
      typeof property === 'string'
        ? customMethods[property as keyof SelectorCustomMethods]
        : undefined;

    let result = (
      customMethod
        ? customMethod.bind(target as unknown as TestCafeSelector)
        : Reflect.get(target, property, receiver)
    ) as Values<Selector> & {[DESCRIPTION_KEY]?: string};

    if (typeof property === 'symbol') {
      return result;
    }

    if ((typeof result !== 'object' || result === null) && typeof result !== 'function') {
      return result;
    }

    if (typeof result === 'function') {
      const originalFunction = result as Fn;

      result = // eslint-disable-next-line no-restricted-syntax
        function selectorMethodWrapper(this: Selector, ...args: never[]) {
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
