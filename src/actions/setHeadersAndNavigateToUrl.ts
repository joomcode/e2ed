import {testController} from '../testController';
import {SetHeadersRequestHook} from '../utils/requestHooks';

import {navigateToUrl} from './navigateToUrl';

import type {MapOptions, Url} from '../types/internal';

/**
 * Navigate to the url and map custom response and request headers.
 */
export const setHeadersAndNavigateToUrl = async (url: Url, options: MapOptions): Promise<void> => {
  const setHeadersRequestHook = new SetHeadersRequestHook(url, options);

  await testController.addRequestHooks(setHeadersRequestHook);

  await navigateToUrl(url, {skipLogs: true});
};
