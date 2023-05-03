import type {Request, Response} from 'e2ed/types';

type RequestBody = undefined;

type ResponseBody = Readonly<{
  data: readonly object[];
}>;

/**
 * API request for get users endpoint.
 */
export type ApiGetUsersRequest = Request<RequestBody>;

/**
 * API response for get users endpoint.
 */
export type ApiGetUsersResponse = Response<ResponseBody>;
