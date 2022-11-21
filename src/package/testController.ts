import {t as originalTestController} from 'testcafe-without-typecheck';

import {E2edError} from './utils/E2edError';

import type {TestController, Values} from './types/internal';

/**
 * Proxy handler for wrapping all tries to get TestController properties.
 */
const get: ProxyHandler<TestController>['get'] = (
  target,
  property,
  receiver,
): Values<TestController> => {
  try {
    const result = Reflect.get(target, property, receiver) as Values<TestController>;

    return result;
  } catch (cause) {
    throw new E2edError(
      `Caught an error on getting property "${String(property)}" of testController`,
      {cause},
    );
  }
};

/**
 * TestController from TestCafe with wrapping of all thrown errors.
 */
export const testController: typeof originalTestController = new Proxy(originalTestController, {
  get,
});
