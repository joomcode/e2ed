import {Route} from './Route';

import type {Url} from './types/internal';

const http = 'http:';
const https = 'https:';

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

  /**
   * Returns the origin of the route.
   */
  getOrigin(): Url {
    return 'http://localhost' as Url;
  }

  /**
   * Returns the url of the route.
   */
  override getUrl(): Url {
    const url = super.getUrl();

    if (url.startsWith(https)) {
      return `wss:${url.slice(https.length)}` as Url;
    }

    if (url.startsWith(http)) {
      return `ws:${url.slice(http.length)}` as Url;
    }

    return url;
  }
}
