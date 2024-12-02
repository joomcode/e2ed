import {stringify} from 'node:querystring';
import {URL} from 'node:url';

import {WebSocketRoute} from 'e2ed';
import {assertValueIsTrue} from 'e2ed/utils';

import type {WebSocketScoreRequest, WebSocketScoreResponse} from 'autotests/types';
import type {Url} from 'e2ed/types';

type Params = Readonly<{size: number}>;

const pathname = '/score';

/**
 * Score WebSocket.
 */
export class Score extends WebSocketRoute<Params, WebSocketScoreRequest, WebSocketScoreResponse> {
  static override getParamsFromUrlOrThrow(url: Url): Params {
    const urlObject = new URL(url);
    const size = urlObject.searchParams.get('size');

    assertValueIsTrue(urlObject.pathname === pathname, 'pathname is correct', {urlObject});

    return {size: Number(size)};
  }

  getPath(): string {
    const {size} = this.routeParams;
    const query = stringify({size});

    return `${pathname}?${query}`;
  }
}
