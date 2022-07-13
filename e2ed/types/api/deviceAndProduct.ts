import type {ApiDevice, Method, MobileDevice, Query, Request, Response, Url} from 'e2ed/types';

type RequestBody = Readonly<{
  cookies: readonly string[];
  input: number;
  model: MobileDevice;
  version: string;
}>;

type ResponseBody = Readonly<{
  id: number;
  method: Method;
  output: string;
  payload: ApiDevice;
  query: Query;
  url: Url;
}>;

/**
 * API request for common device and product endpoint.
 */
export type ApiDeviceAndProductRequest = Request<RequestBody>;

/**
 * API response for common device and product endpoint.
 */
export type ApiDeviceAndProductResponse = Response<ResponseBody>;
