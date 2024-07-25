import type {UtcTimeInMs} from './date';
import type {MergeFunctions} from './fn';
import type {Request, RequestWithUtcTimeInMs, Response, ResponseWithRequest, Url} from './http';
import type {MaybePromise} from './promise';
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
  allRequestsCompleteTimeInMs: UtcTimeInMs;
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
  request: RequestWithUtcTimeInMs<SomeRequest>,
) => MaybePromise<boolean>;

/**
 * Response predicate for `waitForResponse` function.
 */
export type ResponsePredicate<
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> = (response: ResponseWithRequest<SomeResponse, SomeRequest>) => MaybePromise<boolean>;

/**
 * Request or response predicate with resolve and reject functions for both event handlers.
 * @internal
 */
export type RequestOrResponsePredicateWithPromise = Readonly<{
  predicate: RequestOrResponsePredicate;
  reject: RequestPredicateWithPromise['reject'];
  resolve: RequestOrResponseResolve;
  skipLogs: boolean;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * Request predicate with resolve and reject functions for his promise.
 * @internal
 */
export type RequestPredicateWithPromise = Readonly<{
  predicate: RequestPredicate;
  reject: (error: unknown) => void;
  resolve: (request: RequestWithUtcTimeInMs) => void;
  skipLogs: boolean;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * Response predicate with resolve and reject functions for his promise.
 * @internal
 */
export type ResponsePredicateWithPromise = Readonly<{
  predicate: ResponsePredicate;
  reject: (error: unknown) => void;
  resolve: (response: ResponseWithRequest) => void;
  skipLogs: boolean;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * State of requests/responses predicates for `waitForRequest`/`waitForResponse`.
 * @internal
 */
export type WaitForEventsState = Readonly<{
  allRequestsCompletePredicates: Set<AllRequestsCompletePredicateWithPromise>;
  hashOfNotCompleteRequests: Record<RequestHookContextId, RequestWithUtcTimeInMs>;
  redirects: Record<Url, Url>;
  requestPredicates: Set<RequestPredicateWithPromise>;
  responsePredicates: Set<ResponsePredicateWithPromise>;
}>;
