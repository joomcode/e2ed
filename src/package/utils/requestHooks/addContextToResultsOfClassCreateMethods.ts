import {REQUEST_HOOK_CONTEXT_KEY} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';

import type {Fn, RequestHookClassWithContext} from '../../types/internal';

/**
 * If class has this symbol, then the context has already been added to the methods of the class.
 */
const IS_CONTEXT_ADDED_KEY = Symbol(
  'If class has this symbol, then the context has already been added',
);

/**
 * Add request hook context to results of all class's methods, that starts with "create".
 * @internal
 */
export const addContextToResultsOfClassCreateMethods = (
  ClassWithContext: RequestHookClassWithContext,
): void => {
  if (IS_CONTEXT_ADDED_KEY in ClassWithContext) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  (ClassWithContext as {[IS_CONTEXT_ADDED_KEY]?: true})[IS_CONTEXT_ADDED_KEY] = true;

  const {prototype} = ClassWithContext;
  const prototypeKeys = Object.getOwnPropertyNames(prototype);
  const methodNames = prototypeKeys.filter((key) => typeof prototype[key] === 'function');
  const createMethodNames = methodNames.filter((methodName) => methodName.startsWith('create'));

  for (const methodName of createMethodNames) {
    const originalMethod = prototype[methodName];

    assertValueIsDefined(originalMethod, 'originalMethod is defined', {
      ClassWithContext,
      methodName,
    });

    (prototype as Record<string, Fn<never[], unknown, InstanceType<RequestHookClassWithContext>>>)[
      methodName
      // eslint-disable-next-line no-restricted-syntax
    ] = function createSomething(
      this: InstanceType<RequestHookClassWithContext>,
      ...args: never[]
    ) {
      const result = originalMethod.apply(this, args);
      const isResultAnObject = typeof result === 'object' && result !== null;

      if (isResultAnObject && !(REQUEST_HOOK_CONTEXT_KEY in result)) {
        // eslint-disable-next-line no-underscore-dangle
        result[REQUEST_HOOK_CONTEXT_KEY] = this._ctx;
      }

      return result;
    };
  }
};
