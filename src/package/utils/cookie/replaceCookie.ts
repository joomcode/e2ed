import {getCookieHeaderString} from './getCookieHeaderString';

import type {Cookie, CookieHeaderString} from '../../types/internal';

/**
 * Replace one cookie in cookie header string (insert if
 * such a cookie was not in the string) and return new cookie header string.
 */
export const replaceCookie = (
  cookieHeaderString: CookieHeaderString,
  cookie: Cookie,
): CookieHeaderString => {
  const cookies = cookieHeaderString.split('; ');
  const newCookieString = getCookieHeaderString([cookie]);
  const cookieIndex = cookies.findIndex((cookieString) =>
    cookieString.startsWith(`${cookie.name}=`),
  );

  if (cookieIndex === -1) {
    cookies.push(newCookieString);
  } else {
    cookies[cookieIndex] = newCookieString;
  }

  return cookies.join('; ') as CookieHeaderString;
};
