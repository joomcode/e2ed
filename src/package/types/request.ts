import type {Brand} from './utils';
import type {IncomingHttpHeaders} from 'http';

/**
 * Cookie object.
 */
export type Cookie = Readonly<{name: string; value: string}>;

/**
 * HTTP headers.
 */
export type Headers = Readonly<IncomingHttpHeaders>;

/**
 * Map headers to new (overridden) headers.
 */
export type MapHeaders = (headers: Headers) => Partial<Headers>;

/**
 * Options for mappers of headers.
 */
export type MapOptions = Readonly<{
  mapRequestHeaders?: MapHeaders;
  mapResponseHeaders?: MapHeaders;
}>;

/**
 * HTTP Method.
 */
export type Method =
  | 'HEAD'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

/**
 * Object with query (search) part of the url.
 */
export type Query = Record<
  string,
  | string
  | number
  | boolean
  | readonly string[]
  | readonly number[]
  | readonly boolean[]
  | null
  | undefined
>;

/**
 * Brand type for url string.
 */
export type Url = Brand<string, 'Url'>;
