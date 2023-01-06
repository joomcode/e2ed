import type {Inner} from 'testcafe-without-typecheck';

import type {Cookie} from '../../types/internal';

/**
 * Get TestCafe's cookie options from partial cookie object.
 * @internal
 */
export const getCookieOptionsFromPartialCookie = (
  partialCookie: Partial<Cookie>,
): Inner.CookieOptions => {
  const {expires, ...partialCookieWithoutExpires} = partialCookie;

  if (expires === undefined) {
    return partialCookieWithoutExpires;
  }

  return {...partialCookieWithoutExpires, expires: new Date(expires)};
};
