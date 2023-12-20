import {REQUEST_HOOK_CONTEXT_ID_KEY, REQUEST_HOOK_CONTEXT_KEY} from '../../constants/internal';

import {assertValueIsDefined, assertValueIsFalse} from '../asserts';
import {setReadonlyProperty} from '../setReadonlyProperty';

import type {Fn, RequestHookClassWithContext, RequestHookContextId} from '../../types/internal';

/**
 * If class has this symbol, then the context has already been added to the methods of the class.
 */
const IS_CONTEXT_ADDED_KEY = Symbol('e2ed:IS_CONTEXT_ADDED_KEY');

/**
 * Count of all created request hook contexts.
 */
let requestHookContextCount = 0;

const requestHookContextIdHash: Record<RequestHookContextId, true> = {};

/**
 * Adds request hook context to results of all class's methods, that starts with "create".
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

      if (isResultAnObject && !(REQUEST_HOOK_CONTEXT_KEY in result)) {
        if (!(REQUEST_HOOK_CONTEXT_ID_KEY in this)) {
          // eslint-disable-next-line no-underscore-dangle
          const requestId = this._event?.requestId;

          let requestHookContextId: RequestHookContextId | undefined;

          if (requestId === undefined) {
            requestHookContextCount += 1;
            requestHookContextId = String(requestHookContextCount) as RequestHookContextId;
          } else {
            requestHookContextId = requestId as RequestHookContextId;
          }

          assertValueIsFalse(
            requestHookContextId in requestHookContextIdHash,
            'requestHookContextId is unique',
            {methodName, requestHookContextId, that: this},
          );

          requestHookContextIdHash[requestHookContextId] = true;

          setReadonlyProperty(this, REQUEST_HOOK_CONTEXT_ID_KEY, requestHookContextId);
        }

        setReadonlyProperty(result, REQUEST_HOOK_CONTEXT_KEY, this);
      }

      return result;
    };
  }
};
