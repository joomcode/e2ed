import {RESOLVED_PROMISE} from '../../constants/internal';

import {setReadonlyProperty} from '../object';
import {addTimeoutToPromise} from '../promise';
import {isThenable} from '../typeGuards';

import {additionalMatchers} from './additionalMatchers';
import {applyAdditionalMatcher} from './applyAdditionalMatcher';

import type {Fn, SelectorPropertyRetryData} from '../../types/internal';

import type {E2edError} from '../error';

import type {Expect} from './Expect';
import type {ExpectMethod} from './types';

import {expect as playwrightExpect} from '@playwright/test';

type Options = Readonly<{
  args: Parameters<ExpectMethod>;
  context: Expect;
  key: keyof typeof additionalMatchers;
  selectorPropertyRetryData: SelectorPropertyRetryData | undefined;
  timeout: number;
  timeoutError: E2edError;
}>;

/**
 * Get internal assertion promise by assertion options.
 * @internal
 */
export const getAssertionPromise = ({
  args,
  context,
  key,
  selectorPropertyRetryData,
  timeout,
  timeoutError,
}: Options): Promise<Expect> => {
  const runAssertion = (value: unknown): Promise<Expect> => {
    const additionalMatcher = additionalMatchers[key];
    const ctx: Expect = {actualValue: value, description: context.description};

    if (additionalMatcher !== undefined) {
      return addTimeoutToPromise(
        applyAdditionalMatcher(
          additionalMatcher as Fn<unknown[], Promise<unknown>>,
          ctx,
          args,
          selectorPropertyRetryData,
        ),
        timeout,
        timeoutError,
      ).catch((assertError: Error) => {
        setReadonlyProperty(ctx, 'error', assertError);

        return ctx;
      });
    }

    const assertion = playwrightExpect(value, ctx.description) as unknown as Record<
      string,
      Fn<unknown[], Promise<unknown>>
    >;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return addTimeoutToPromise(assertion[key]!(...args), timeout, timeoutError).then(
      () => ctx,
      (assertError: Error) => {
        setReadonlyProperty(ctx, 'error', assertError);

        return ctx;
      },
    );
  };

  const assertionPromise: Promise<Expect> = RESOLVED_PROMISE.then(() => {
    if (isThenable(context.actualValue)) {
      return addTimeoutToPromise(
        context.actualValue as Promise<unknown>,
        timeout,
        timeoutError,
      ).then(runAssertion);
    }

    return runAssertion(context.actualValue);
  });

  return assertionPromise;
};
