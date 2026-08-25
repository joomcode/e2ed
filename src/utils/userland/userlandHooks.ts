import type {UserlandHooks} from '../../types/internal';

let userlandHooks: UserlandHooks | undefined;

/**
 * Get userland hooks.
 * @internal
 */
export const getUserlandHooks = (): UserlandHooks => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const asserts = require<typeof import('../asserts')>('../asserts');

  const assertValueIsDefined: typeof asserts.assertValueIsDefined = asserts.assertValueIsDefined;

  assertValueIsDefined(userlandHooks, 'userlandHooks is defined');

  return userlandHooks;
};

/**
 * Set userland hooks (once).
 * @internal
 */
export const setUserlandHooks = (hooks: UserlandHooks): void => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const asserts = require<typeof import('../asserts')>('../asserts');

  const assertValueIsDefined: typeof asserts.assertValueIsDefined = asserts.assertValueIsDefined;
  const assertValueIsUndefined: typeof asserts.assertValueIsUndefined =
    asserts.assertValueIsUndefined;

  assertValueIsUndefined(userlandHooks, 'userlandHooks is not defined', {hooks});

  assertValueIsDefined(hooks, 'hooks is defined', {userlandHooks});

  userlandHooks = hooks;
};
