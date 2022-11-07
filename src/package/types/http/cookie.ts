import type {Brand} from '../brand';

/**
 * Cookie parameters object.
 */
export type Cookie = Readonly<{
  domain?: string;
  expires: Date;
  httpOnly: boolean;
  name: string;
  path: string;
  sameSite: 'lax' | 'none' | 'strict';
  secure: boolean;
  value: string;
}>;

/**
 * Value of cookie (request) header for one or several cookies.
 * @example
 * maps_los=1; _ge=GA1.2.1967685687
 */
export type CookieHeaderString = Brand<string, 'CookieHeaderString'>;

/**
 * Value of set-cookie (response) header for single cookie.
 * @example
 * maps_los=1; expires=Tue, 07-Nov-2023 00:20:49 GMT; path=/; domain=.example.com; Secure; HttpOnly; SameSite=none
 */
export type SetCookieHeaderString = Brand<string, 'SetCookieHeaderString'>;
