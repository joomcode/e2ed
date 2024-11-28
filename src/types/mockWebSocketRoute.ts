import type {URL} from 'node:url';

import type {WebSocketRoute} from '../WebSocketRoute';

import type {Url} from './http';
import type {MaybePromise} from './promise';
import type {WebSocketRouteClassTypeWithGetParamsFromUrl} from './routes';

/**
 * Mock option with mocked route.
 * @internal
 */
type MockOptionsWithRoute = MockOptions & Readonly<{route: WebSocketRoute<unknown>}>;

/**
 * Mock option (`skipLogs` and `webSocketMockFunction`).
 */
type MockOptions = Readonly<{skipLogs: boolean; webSocketMockFunction: WebSocketMockFunction}>;

/**
 * WebSocket mock function, that map request to mocked response.
 */
export type WebSocketMockFunction<
  RouteParams = unknown,
  SomeRequest = unknown,
  SomeResponse = unknown,
> = (routeParams: RouteParams, request: SomeRequest) => MaybePromise<SomeResponse>;

/**
 * Internal state of `mockWebSocketRoute`/`unmockWebSocketRoute`.
 * @internal
 */
export type WebSocketMockState = Readonly<{
  isMocksEnabled: boolean;
  optionsByRoute: Map<WebSocketRouteClassTypeWithGetParamsFromUrl, MockOptions> | undefined;
  optionsWithRouteByUrl: Record<Url, MockOptionsWithRoute | undefined>;
  requestsFilter: ((urlObject: URL) => boolean) | undefined;
}>;
