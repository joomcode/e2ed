import type {Method, Query, Request, Response, Url} from 'e2ed/types';

type RequestBody = Readonly<{
  input: number;
}>;

type ResponseBody = Readonly<{id: number; method: Method; output: string; query: Query; url: Url}>;

/**
 * Request for common device and product endpoint.
 */
export type DeviceAndProductRequest = Request<RequestBody>;

/**
 * Response for common device and product endpoint.
 */
export type DeviceAndProductResponse = Response<ResponseBody>;
