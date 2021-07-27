import {testController} from 'e2ed';

/**
 * This hook is used inside the navigateToPage function to navigate to the page
 * under the already computed url.
 * As with all hooks, you can replace it with your own implementation.
 * Use context (e2ed/context) to get parameters inside a hook.
 */
export const navigateTo = (url: string): Promise<void> => testController.navigateTo(url);
