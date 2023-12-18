import type {UserWorker} from 'autotests/types';
import type {Request, Response} from 'e2ed/types';

/**
 * API request for adding user-worker endpoint.
 */
export type ApiAddUserRequest = Request<UserWorker>;

/**
 * API response for adding user-worker endpoint.
 */
export type ApiAddUserResponse = Response<UserWorker>;
