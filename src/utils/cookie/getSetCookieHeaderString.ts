import type {Cookie, SetCookieHeaderString} from '../../types/internal';

const msInSecond = 1_000;
const secondsInDay = 86_400;

/**
 * Get value of set-cookie (response) header string for single cookie by cookie parameters object.
 * @example
 * maps_los=1; expires=Tue, 07-Nov-2023 00:20:49 GMT; path=/; domain=.example.com; Secure; HttpOnly; SameSite=none
 */
export const getSetCookieHeaderString = (cookie: Cookie): SetCookieHeaderString => {
  const {
    domain,
    expires = Date.now() + secondsInDay * msInSecond,
    httpOnly,
    name,
    path,
    sameSite,
    secure,
    value,
  } = cookie;
  const expiresDate = new Date(expires);
  const maxAge = Math.round((expires - Date.now()) / msInSecond);

  const cookieStringParts = [
    `${name}=${value}`,
    `Max-Age=${maxAge}`,
    `Path=${path}`,
    `Expires=${expiresDate.toUTCString()}`,
  ];

  if (domain !== undefined) {
    cookieStringParts.push(`domain=${domain}`);
  }

  if (secure) {
    cookieStringParts.push('Secure');
  }

  if (httpOnly) {
    cookieStringParts.push('HttpOnly');
  }

  cookieStringParts.push(`SameSite=${sameSite}`);

  return cookieStringParts.join('; ') as SetCookieHeaderString;
};
