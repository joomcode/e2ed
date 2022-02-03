import {testController} from 'e2ed';

import type {Url} from 'e2ed/types';

/**
 * This hook is used inside the navigateToPage function to navigate to the page
 * under the already computed url.
 * Use context (e2ed/context) to get parameters inside a hook.
 */
export const navigateTo = (url: Url): Promise<void> =>
  // As with all hooks, you can replace it with your own implementation.
  testController.navigateTo(url);
