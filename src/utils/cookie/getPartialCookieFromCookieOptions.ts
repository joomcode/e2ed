import {assertStringIsSameSite} from './assertStringIsSameSite';

import type {Inner} from 'testcafe-without-typecheck';

import type {Cookie} from '../../types/internal';

/**
 * Get partial cookie object from TestCafe's cookie options.
 * @internal
 */
export const getPartialCookieFromCookieOptions = (
  cookieOptions: Inner.CookieOptions,
): Partial<Cookie> => {
  const {expires, sameSite, ...commonCookieOptions} = cookieOptions;
  let partialCookieWithoutExpires: Omit<Partial<Cookie>, 'expires'>;

  if (sameSite === undefined) {
    partialCookieWithoutExpires = commonCookieOptions;
  } else {
    assertStringIsSameSite(sameSite);

    partialCookieWithoutExpires = {...commonCookieOptions, sameSite};
  }

  if (expires === undefined) {
    return partialCookieWithoutExpires;
  }

  return {...partialCookieWithoutExpires, expires: Number(expires)};
};
