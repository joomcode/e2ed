import {REQUEST_HOOK_CONTEXT_ID_KEY, REQUEST_HOOK_CONTEXT_KEY} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {setReadonlyProperty} from '../setReadonlyProperty';

import type {Fn, RequestHookClassWithContext, RequestHookContextId} from '../../types/internal';

/**
 * If class has this symbol, then the context has already been added to the methods of the class.
 */
const IS_CONTEXT_ADDED_KEY = Symbol(
  'If class has this symbol, then the context has already been added',
);

/**
 * Count of all created request hook contexts.
 */
let requestHookContextCount = 0;

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
      // eslint-disable-next-line no-loop-func, no-restricted-syntax
    ] = function createSomething(
      this: InstanceType<RequestHookClassWithContext>,
      ...args: never[]
    ) {
      const result = originalMethod.apply(this, args);
      const isResultAnObject = typeof result === 'object' && result !== null;

      // eslint-disable-next-line no-underscore-dangle
      const context = this._ctx;

      if (isResultAnObject && !(REQUEST_HOOK_CONTEXT_KEY in result)) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (context && !(REQUEST_HOOK_CONTEXT_ID_KEY in context)) {
          requestHookContextCount += 1;

          setReadonlyProperty(
            context,
            REQUEST_HOOK_CONTEXT_ID_KEY,
            String(requestHookContextCount) as RequestHookContextId,
          );
        }

        setReadonlyProperty(result, REQUEST_HOOK_CONTEXT_KEY, context);
      }

      return result;
    };
  }
};
