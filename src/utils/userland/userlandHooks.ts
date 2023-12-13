import {assertValueIsDefined, assertValueIsUndefined} from '../asserts';

import type {UserlandHooks} from '../../types/internal';

let userlandHooks: UserlandHooks | undefined;

/**
 * Get userland hooks.
 * @internal
 */
export const getUserlandHooks = (): UserlandHooks => {
  assertValueIsDefined(userlandHooks, 'userlandHooks is defined');

  return userlandHooks;
};

/**
 * Set userland hooks (once).
 * @internal
 */
export const setUserlandHooks = (hooks: UserlandHooks): void => {
  assertValueIsUndefined(userlandHooks, 'userlandHooks is not defined', {hooks});

  assertValueIsDefined(hooks, 'hooks is defined', {userlandHooks});

  userlandHooks = hooks;
};
