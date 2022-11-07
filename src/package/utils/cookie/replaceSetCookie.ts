import {getSetCookieHeaderString} from './getSetCookieHeaderString';

import type {Cookie, SetCookieHeaderString} from '../../types/internal';

/**
 * Replace one cookie in array of set-cookie header strings
 * (insert if such a cookie was not in the array) and return new array of cookies.
 */
export const replaceSetCookie = (
  setCookies: readonly SetCookieHeaderString[],
  cookie: Cookie,
): readonly SetCookieHeaderString[] => {
  const newSetCookies = [...setCookies];
  const newSetCookieString = getSetCookieHeaderString(cookie);
  const cookieIndex = newSetCookies.findIndex((setCookieString) =>
    setCookieString.startsWith(`${cookie.name}=`),
  );

  if (cookieIndex === -1) {
    newSetCookies.push(newSetCookieString);
  } else {
    newSetCookies[cookieIndex] = newSetCookieString;
  }

  return newSetCookies;
};
