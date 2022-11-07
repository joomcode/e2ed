import type {Cookie, CookieHeaderString} from '../../types/internal';

/**
 * Get value of cookie (request) header string for one or several cookies
 * by cookies parameters objects.
 * @example
 * maps_los=1; _ge=GA1.2.1967685687
 */
export const getCookieHeaderString = (cookies: readonly Cookie[]): CookieHeaderString => {
  const cookieStringParts = cookies.map(({name, value}) => `${name}=${value}`);

  return cookieStringParts.join('; ') as CookieHeaderString;
};
