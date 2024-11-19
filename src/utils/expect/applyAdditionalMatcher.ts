import {getFullPackConfig} from '../config';

import type {Fn, Selector, SelectorPropertyRetryData} from '../../types/internal';

import type {Expect} from './Expect';

import {expect} from '@playwright/test';

/**
 * Apply additional matcher (with retrying, if needed).
 * @internal
 */
export const applyAdditionalMatcher = (
  matcher: Fn<unknown[], Promise<unknown>>,
  ctx: Expect,
  args: unknown[],
  selectorPropertyRetryData: SelectorPropertyRetryData | undefined,
  // eslint-disable-next-line @typescript-eslint/max-params
): Promise<Expect> => {
  if (selectorPropertyRetryData === undefined) {
    return matcher.apply(ctx, args).then(() => ctx);
  }

  const {assertionTimeout} = getFullPackConfig();

  let context: Expect;

  return expect(() => {
    const {args: selectorArgs, property, selector} = selectorPropertyRetryData;

    const actualValue =
      selectorArgs === undefined
        ? (selector[property as keyof Selector] as Promise<unknown>)
        : (selector[property as keyof Selector] as Fn<unknown[], Promise<unknown>>)(
            ...selectorArgs,
          );

    return actualValue.then((value) => {
      context = {actualValue: value, description: ctx.description};

      return matcher.apply(context, args);
    });
  })
    .toPass({timeout: assertionTimeout})
    .then(() => context);
};
