import type {RequestHookToWaitForEvents} from '../utils/requestHooks';

import type {Request, Response} from './http';

/**
 * Request predicate for waitForRequest function.
 */
export type RequestPredicate<SomeRequest extends Request = Request> = (
  request: SomeRequest,
) => Promise<boolean> | boolean;

/**
 * Response predicate for waitForResponse function.
 */
export type ResponsePredicate<SomeResponse extends Response = Response> = (
  request: SomeResponse,
) => Promise<boolean> | boolean;

/**
 * Request predicate with resolve and reject functions for his promise.
 * @internal
 */
export type RequestPredicateWithPromise = Readonly<{
  predicate: RequestPredicate;
  reject: (error: unknown) => void;
  resolve: (request: Request) => void;
}>;

/**
 * Response predicate with resolve and reject functions for his promise.
 * @internal
 */
export type ResponsePredicateWithPromise = Readonly<{
  predicate: ResponsePredicate;
  reject: (error: unknown) => void;
  resolve: (response: Response) => void;
}>;

/**
 * State of requests/responses predicates for waitForRequest/waitForResponse.
 * @internal
 */
export type WaitForEventsState = Readonly<{
  hook: RequestHookToWaitForEvents;
  hookAdded: boolean;
  requestPredicates: Set<RequestPredicateWithPromise>;
  responsePredicates: Set<ResponsePredicateWithPromise>;
}>;
