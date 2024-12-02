import {WebSocketRoute} from 'e2ed';

import type {WebSocketBaseRequest, WebSocketBaseResponse} from 'autotests/types';

/**
 * Base WebSocket.
 */
export class Base extends WebSocketRoute<undefined, WebSocketBaseRequest, WebSocketBaseResponse> {
  getPath(): string {
    return '/base';
  }
}
