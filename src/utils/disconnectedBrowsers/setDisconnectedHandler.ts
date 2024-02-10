import {disconnectedHandler} from './disconnectedHandler';

import type {TestCafeBrowserConnection, TestCafeBrowserConnectionId} from '../../types/internal';

const disconnectedBrowsersHash: Record<TestCafeBrowserConnectionId, true> = {};
const subscribedBrowsersHash: Record<TestCafeBrowserConnectionId, true> = {};

/**
 * Set `disconnected` event handler on the browser to monitor the number of disconnected browsers.
 * @internal
 */
export const setDisconnectedHandler = (browserConnection: TestCafeBrowserConnection): void => {
  const {id} = browserConnection;

  if (subscribedBrowsersHash[id]) {
    return;
  }

  subscribedBrowsersHash[id] = true;

  browserConnection.once('disconnected', () => {
    if (disconnectedBrowsersHash[id]) {
      return;
    }

    disconnectedBrowsersHash[id] = true;

    const disconnectedBrowsersCount = Object.keys(disconnectedBrowsersHash).length;

    void disconnectedHandler(disconnectedBrowsersCount);
  });
};
