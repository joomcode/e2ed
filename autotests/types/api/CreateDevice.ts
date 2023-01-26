import type {ApiDevice, ApiDeviceParams} from 'autotests/types';
import type {Method, Query, Request, Response, Url} from 'e2ed/types';

type RequestBody = ApiDeviceParams;

type ResponseBody = Readonly<{
  id: number;
  method: Method;
  output: string;
  payload: ApiDevice;
  query: Query;
  url: Url;
}>;

/**
 * API request for create device endpoint.
 */
export type ApiCreateDeviceRequest = Request<RequestBody, Query, {'x-my-request-id': string}>;

/**
 * API response for create device endpoint.
 */
export type ApiCreateDeviceResponse = Response<ResponseBody>;
