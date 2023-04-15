import {LogEventType} from '../constants/internal';
import {createClientFunction} from '../createClientFunction';
import {testController} from '../testController';
import {getFullPackConfig} from '../utils/getFullPackConfig';
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
 * Navigate to the url (without waiting of interface stabilization).
 */
export const navigateToUrl = async (url: Url, options: Options = {}): Promise<void> => {
  const {skipLogs = false} = options;

  if (skipLogs !== true) {
    log(`Will navigate to the url ${url}`, LogEventType.InternalAction);
  }

  const {nativeAutomation} = getFullPackConfig();

  if (nativeAutomation) {
    await testController.navigateTo(url);
  } else {
    await clientNavigateToUrl(url);
  }

  if (skipLogs !== true) {
    log(`Navigation to the url ${url} completed`, LogEventType.InternalAction);
  }
};
