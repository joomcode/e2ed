/**
 * Request for score WebSocket.
 */
export type WebSocketScoreRequest = Readonly<{pageState: string}>;

/**
 * Response for score WebSocket.
 */
export type WebSocketScoreResponse = Readonly<{score: number}>;
