import {trimSemicolonsAtTheEnd} from './trimSemicolonsAtTheEnd';

import type {Cookie} from '../types/internal';

/**
 * Replace one cookie in array of cookie (insert if such a cookie was not in the array)
 * and return new array of cookies.
 */
export const replaceCookie = (cookies: string[], cookie: Cookie): string[] => {
  const newCookies = [...cookies];
  const newCookieString = `${cookie.name}=${cookie.value};`;
  const cookieIndex = newCookies.findIndex((cookieString) =>
    cookieString.startsWith(`${cookie.name}=`),
  );

  if (cookieIndex === -1) {
    newCookies.push(trimSemicolonsAtTheEnd(newCookieString));
  } else {
    const cookieString = newCookies[cookieIndex];
    const semicolonIndex = cookieString.indexOf(';');

    if (semicolonIndex === -1) {
      newCookies[cookieIndex] = newCookieString;
    } else {
      newCookies[cookieIndex] = `${newCookieString}${cookieString.slice(semicolonIndex + 1)}`;
    }

    newCookies[cookieIndex] = trimSemicolonsAtTheEnd(newCookies[cookieIndex]);
  }

  return newCookies;
};
