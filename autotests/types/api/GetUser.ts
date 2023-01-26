import type {ApiUser} from 'autotests/types';
import type {Request, Response} from 'e2ed/types';

type RequestBody = undefined;

type ResponseBody = Readonly<{
  payload: ApiUser;
}>;

/**
 * API request for get user endpoint.
 */
export type ApiGetUserRequest = Request<RequestBody>;

/**
 * API response for get user endpoint.
 */
export type ApiGetUserResponse = Response<ResponseBody>;
