import {LogEventType} from '../constants/internal';
import {getCdpClient} from '../context/cdpClient';
import {createClientFunction} from '../createClientFunction';
import {getFullPackConfig} from '../utils/config';
import {log} from '../utils/log';

import type {Url, Void} from '../types/internal';

const clientNavigateToUrl = createClientFunction<[url: Url], Void>(
  (url) => {
    window.location.href = url;
  },
  {name: 'navigateToUrl'},
);

type Options = Readonly<{
  skipLogs?: boolean;
}>;

/**
 * Navigate to the `url` (without waiting of interface stabilization).
 */
export const navigateToUrl = async (url: Url, options: Options = {}): Promise<void> => {
  const {skipLogs = false} = options;

  if (skipLogs !== true) {
    log(`Will navigate to the url ${url}`, LogEventType.InternalAction);
  }

  const {enableChromeDevToolsProtocol} = getFullPackConfig();

  if (enableChromeDevToolsProtocol) {
    const cdpClient = getCdpClient();

    await cdpClient.Page.navigate({transitionType: 'address_bar', url});
  } else {
    await clientNavigateToUrl(url);
  }

  if (skipLogs !== true) {
    log(`Navigation to the url ${url} completed`, LogEventType.InternalAction);
  }
};
