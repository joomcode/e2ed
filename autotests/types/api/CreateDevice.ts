import type {ApiDeviceParams, ApiProduct} from 'autotests/types';
import type {Query, Request, Response} from 'e2ed/types';

type RequestBody = ApiDeviceParams;

type ResponseBody = ApiProduct;
/**
 * API request for create device endpoint.
 */
export type ApiCreateDeviceRequest = Request<RequestBody, Query, {'x-my-request-id': string}>;

/**
 * API response for create device endpoint.
 */
export type ApiCreateDeviceResponse = Response<ResponseBody>;
