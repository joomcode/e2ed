import {Main} from 'autotests/routes/pageRoutes';
import {Base, Score} from 'autotests/routes/webSocketRoutes';
import {mockWebSocketRoute, unmockWebSocketRoute} from 'e2ed/actions';

import type {WebSocketScoreRequest, WebSocketScoreResponse} from 'autotests/types';
import type {Any} from 'e2ed/types';

const anyMockFunction = (..._args: Any[]): Any => {};

const webSocketMockFunction = (
  {size}: {size: number},
  {pageState}: WebSocketScoreRequest,
): WebSocketScoreResponse => {
  if (pageState !== '') {
    return {score: 8};
  }

  return {score: size > 2 ? size : 2};
};

// @ts-expect-error: mockWebSocketRoute require WebSocket route as first argument
void mockWebSocketRoute(Main, anyMockFunction);

// @ts-expect-error: unmockWebSocketRoute require WebSocket route as first argument
void unmockWebSocketRoute(Main);

// @ts-expect-error: mockWebSocketRoute require WebSocket route with static method getParamsFromUrlOrThrow
void mockWebSocketRoute(Base, anyMockFunction);

// ok
void mockWebSocketRoute(Score, anyMockFunction);

// @ts-expect-error: unmockWebSocketRoute require WebSocket route with static method getParamsFromUrlOrThrow
void unmockWebSocketRoute(Base);

// ok
void mockWebSocketRoute(Score, webSocketMockFunction);

// ok
void unmockWebSocketRoute(Score);

// ok
void mockWebSocketRoute(
  Score,
  async (
    {size},
    {pageState}, // eslint-disable-next-line @typescript-eslint/require-await
  ) => {
    if (pageState !== '') {
      return {score: 10};
    }

    return {score: size > 1 ? size : 1};
  },
);
