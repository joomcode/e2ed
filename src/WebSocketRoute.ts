import {Route} from './Route';

/**
 * Abstract route for WebSocket "requests".
 */
export abstract class WebSocketRoute<
  Params = undefined,
  SomeRequest = unknown,
  SomeResponse = unknown,
> extends Route<Params> {
  /**
   * Request type of WebSocket route.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare readonly __REQUEST_KEY: SomeRequest;

  /**
   * Response type of WebSocket route.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare readonly __RESPONSE_KEY: SomeResponse;

  /**
   * Returns `true`, if the request body is in JSON format.
   */
  getIsRequestBodyInJsonFormat(): boolean {
    return true;
  }

  /**
   * Returns `true`, if the response body is in JSON format.
   */
  getIsResponseBodyInJsonFormat(): boolean {
    return true;
  }
}
