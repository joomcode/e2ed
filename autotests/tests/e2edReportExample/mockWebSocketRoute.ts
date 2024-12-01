import {test} from 'autotests';
import {sendScore} from 'autotests/entities';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {Score as ScoreRoute} from 'autotests/routes/webSocketRoutes';
import {expect} from 'e2ed';
import {mockWebSocketRoute, navigateToPage, unmockWebSocketRoute} from 'e2ed/actions';
import {assertFunctionThrows} from 'e2ed/utils';

import type {Url} from 'e2ed/types';

test(
  'mockWebSocketRoute correctly intercepts requests, and unmockWebSocketRoute cancels the interception',
  {meta: {testId: '19'}, testIdleTimeout: 3_000},
  async () => {
    await mockWebSocketRoute(ScoreRoute, ({size}, {pageState}) => {
      const stateScore = Number(pageState);

      return {score: size * stateScore};
    });

    await navigateToPage(E2edReportExample);

    const pageState = '5';
    const size = 3;
    const webSocketUrl = `wss://localhost/score?size=${size}` as Url;

    const result = await sendScore(pageState, webSocketUrl);

    const scoreRouteParams = ScoreRoute.getParamsFromUrlOrThrow(webSocketUrl);

    const scoreRouteFromUrl = new ScoreRoute(scoreRouteParams);

    await expect(scoreRouteFromUrl.routeParams.size, 'route has correct params').eql(size);

    await expect(JSON.parse(result), 'mocked WebSocket returns correct result').eql({
      score: size * Number(pageState),
    });

    await unmockWebSocketRoute(ScoreRoute);

    await assertFunctionThrows(async () => {
      await sendScore(pageState, webSocketUrl);
    }, 'throws an error after unmocking WebSocket route');
  },
);
