import {LogEventType} from '../constants/internal';
import {getCdpClient} from '../context/cdpClient';
import {createClientFunction} from '../createClientFunction';
import {getFullPackConfig} from '../utils/config';
import {log} from '../utils/log';

import {waitForTimeout} from './waitFor';

import type {ClientFunction, Url, Void} from '../types/internal';

let clientNavigateToUrl: ClientFunction<[url: Url], Void> | undefined;

const defaultCdpNavigationTimeoutInMs = 2_000;

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

  const {enableChromeDevToolsProtocol} = getFullPackConfig();

  if (enableChromeDevToolsProtocol) {
    const cdpClient = getCdpClient();

    await waitForTimeout(defaultCdpNavigationTimeoutInMs);

    await cdpClient.Page.navigate({transitionType: 'address_bar', url});
  } else {
    await clientNavigateToUrl(url);
  }

  if (skipLogs !== true) {
    log(`Navigation to the url ${url} completed`, LogEventType.InternalAction);
  }
};
