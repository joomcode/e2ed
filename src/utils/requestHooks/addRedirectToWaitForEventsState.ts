import type Protocol from 'devtools-protocol';

import type {Url, WaitForEventsState} from '../../types/internal';

/**
 * Adds (register) new redirect into `WaitForEventsState`, if any.
 * @internal
 */
export const addRedirectToWaitForEventsState = (
  redirectResponse: Protocol.Network.Response,
  waitForEventsState: WaitForEventsState,
): void => {
  const {location} = redirectResponse.headers;

  if (location !== undefined) {
    // eslint-disable-next-line no-param-reassign
    waitForEventsState.redirects[redirectResponse.url as Url] = location as Url;
  }
};
