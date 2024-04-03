import {URL} from 'node:url';

import {LogEventType} from '../constants/internal';
import {getCdpClient} from '../context/cdpClient';
import {createClientFunction} from '../createClientFunction';
import {log} from '../utils/log';

import type {ClientFunction, Url, Void} from '../types/internal';

let clientNavigateToUrl: ClientFunction<[url: Url], Void> | undefined;

type Options = Readonly<{
  skipLogs?: boolean;
}>;

/**
 * Navigate to the `url` (without waiting of interface stabilization).
 */
export const navigateToUrl = async (url: Url, options: Options = {}): Promise<void> => {
  if (clientNavigateToUrl === undefined) {
    clientNavigateToUrl = createClientFunction<[url: Url], Void>(
      (clientUrl) => {
        window.location.href = clientUrl;
      },
      {name: 'navigateToUrl'},
    );
  }

  const {skipLogs = false} = options;

  if (skipLogs !== true) {
    log(`Will navigate to the url ${url}`, LogEventType.InternalAction);
  }

  const cdpClient = getCdpClient();

  if (cdpClient !== undefined) {
    const {origin} = new URL(url);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    await cdpClient.ServiceWorker.unregister({scopeURL: origin});

    await cdpClient.Page.navigate({transitionType: 'typed', url});
  } else {
    await clientNavigateToUrl(url);
  }

  if (skipLogs !== true) {
    log(`Navigation to the url ${url} completed`, LogEventType.InternalAction);
  }
};
