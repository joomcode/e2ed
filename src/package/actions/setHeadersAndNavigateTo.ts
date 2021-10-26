import {testController} from '../testController';
import {SetHeadersRequestHook} from '../utils/SetHeadersRequestHook';

import type {MapOptions} from '../types/internal';

/**
 * Navigate to the page and map custom response and request headers.
 */
export const setHeadersAndNavigateTo = async (url: string, options: MapOptions): Promise<void> => {
  const setHeadersRequestHook = new SetHeadersRequestHook(url, options);

  await testController.addRequestHooks(setHeadersRequestHook);

  await testController.navigateTo(url);

  await testController.removeRequestHooks(setHeadersRequestHook);
};
