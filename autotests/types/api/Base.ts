/**
 * Request for base WebSocket.
 */
export type WebSocketBaseRequest = Readonly<{pageState: string}>;

/**
 * Response for base WebSocket.
 */
export type WebSocketBaseResponse = Readonly<{tags: readonly string[]}>;
