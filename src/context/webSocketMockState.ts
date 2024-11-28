import {useContext} from '../useContext';

import type {WebSocketMockState} from '../types/internal';

/**
 * Raw get and set internal (maybe `undefined`) WebSocket mock state.
 * @internal
 */
const [getRawWebSocketMockState, setRawWebSocketMockState] = useContext<WebSocketMockState>();

/**
 * Get internal always defined WebSocket mock state (for `mockWebSocketRoute`).
 * @internal
 */
export const getWebSocketMockState = (): WebSocketMockState => {
  const maybeWebSocketMockState = getRawWebSocketMockState();

  if (maybeWebSocketMockState !== undefined) {
    return maybeWebSocketMockState;
  }

  const webSocketMockState: WebSocketMockState = {
    isMocksEnabled: true,
    optionsByRoute: undefined,
    optionsWithRouteByUrl: Object.create(null) as {},
    requestsFilter: undefined,
  };

  setRawWebSocketMockState(webSocketMockState);

  return webSocketMockState;
};
