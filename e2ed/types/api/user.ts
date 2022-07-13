import type {ApiUser, Device, Email, Password, Request, Response} from 'e2ed/types';

type RequestBody = Readonly<{
  device: Device;
  name: string;
  email: Email;
  password: Password;
}>;

type ResponseBody = Readonly<{
  payload: ApiUser;
}>;

/**
 * API request for user creation endpoint.
 */
export type ApiUserRequest = Request<RequestBody>;

/**
 * API response for user creation endpoint.
 */
export type ApiUserResponse = Response<ResponseBody>;
