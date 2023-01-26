import type {ApiUser, ApiUserParams} from 'autotests/types';
import type {Request, Response} from 'e2ed/types';

type RequestBody = ApiUserParams;

type ResponseBody = Readonly<{
  payload: ApiUser;
}>;

/**
 * API request for user sign up endpoint.
 */
export type ApiUserSignUpRequest = Request<RequestBody>;

/**
 * API response for user sign up endpoint.
 */
export type ApiUserSignUpResponse = Response<ResponseBody>;
