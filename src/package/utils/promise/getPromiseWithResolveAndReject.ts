import {assertValueIsDefined} from '../asserts';

type Return<PromiseValue, ResolveValue, RejectValue> = Readonly<{
  promise: Promise<PromiseValue>;
  reject: (error: RejectValue) => void;
  resolve: (value: ResolveValue) => void;
}>;

/**
 * Get typed promise with his resolve and reject functions.
 */
export const getPromiseWithResolveAndReject = <
  PromiseValue = unknown,
  ResolveValue = PromiseValue,
  RejectValue = unknown,
>(): Return<PromiseValue, ResolveValue, RejectValue> => {
  let reject: Return<PromiseValue, ResolveValue, RejectValue>['reject'] | undefined;
  let resolve: Return<PromiseValue, ResolveValue, RejectValue>['resolve'] | undefined;

  const promise = new Promise<PromiseValue>((res, rej) => {
    resolve = res as typeof resolve;
    reject = rej;
  });

  assertValueIsDefined(reject, 'reject is defined', {promise, resolve});
  assertValueIsDefined(resolve, 'resolve is defined', {promise, reject});

  return {promise, reject, resolve};
};
