import type {RequestHookToWaitForEvents} from '../utils/requestHooks';

import type {UtcTimeInMs} from './date';
import type {MergeFunctions} from './fn';
import type {Request, Response} from './http';
import type {RequestHookContextId} from './requestHooks';

/**
 * Request or response predicate for both event handlers.
 * @internal
 */
type RequestOrResponsePredicate = MergeFunctions<RequestPredicate | ResponsePredicate>;

/**
 * Request or response resolve function for both event handlers.
 * @internal
 */
type RequestOrResponseResolve = MergeFunctions<
  (RequestPredicateWithPromise | ResponsePredicateWithPromise)['resolve']
>;

/**
 * "All requests complete" predicate with resolve and reject functions for his promise.
 * @internal
 */
export type AllRequestsCompletePredicateWithPromise = Readonly<{
  clearResolveTimeout: () => void;
  predicate: RequestPredicate;
  reject: (error: unknown) => void;
  requestHookContextIds: Set<RequestHookContextId>;
  setResolveTimeout: () => void;
}>;

/**
 * Request predicate for `waitForRequest` function.
 */
export type RequestPredicate<SomeRequest extends Request = Request> = (
  request: SomeRequest,
) => Promise<boolean> | boolean;

/**
 * Response predicate for `waitForResponse` function.
 */
export type ResponsePredicate<SomeResponse extends Response = Response> = (
  request: SomeResponse,
) => Promise<boolean> | boolean;

/**
 * Request or response predicate with resolve and reject functions for both event handlers.
 * @internal
 */
export type RequestOrResponsePredicateWithPromise = Readonly<{
  predicate: RequestOrResponsePredicate;
  reject: RequestPredicateWithPromise['reject'];
  resolve: RequestOrResponseResolve;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * Request predicate with resolve and reject functions for his promise.
 * @internal
 */
export type RequestPredicateWithPromise = Readonly<{
  predicate: RequestPredicate;
  reject: (error: unknown) => void;
  resolve: (request: Request) => void;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * Response predicate with resolve and reject functions for his promise.
 * @internal
 */
export type ResponsePredicateWithPromise = Readonly<{
  predicate: ResponsePredicate;
  reject: (error: unknown) => void;
  resolve: (response: Response) => void;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * State of requests/responses predicates for `waitForRequest`/`waitForResponse`.
 * @internal
 */
export type WaitForEventsState = Readonly<{
  allRequestsCompletePredicates: Set<AllRequestsCompletePredicateWithPromise>;
  hook: RequestHookToWaitForEvents;
  hashOfNotCompleteRequests: Record<RequestHookContextId, Request>;
  requestPredicates: Set<RequestPredicateWithPromise>;
  responsePredicates: Set<ResponsePredicateWithPromise>;
}>;
