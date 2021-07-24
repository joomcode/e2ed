import {t} from 'testcafe';

import {SetHeadersRequestHook} from '../utils';

import type {MapOptions} from '../types';

/**
 * Navigate to the page and map custom response and request headers.
 */
export const setHeadersAndNavigateTo = async (url: string, options: MapOptions): Promise<void> => {
  const setHeadersRequestHook = new SetHeadersRequestHook(url, options);

  await t.addRequestHooks(setHeadersRequestHook);

  await t.navigateTo(url);

  await t.removeRequestHooks(setHeadersRequestHook);
};
