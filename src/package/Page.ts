/* eslint-disable @typescript-eslint/require-await */

import type {Route} from './Route';
import type {PARAMS} from './types/internal';

declare const PARAMS_KEY: PARAMS;

/**
 * Abstract page with base methods.
 */
export abstract class Page<PageParams, RouteParams> {
  [PARAMS_KEY]: PageParams;

  /**
   * Page route.
   */
  abstract readonly route: Route<RouteParams>;

  /**
   * This async method is called before navigating to the page.
   * It accepts some route parameters, and should return the required route parameters.
   */
  abstract willNavigateTo(params: PageParams): Promise<RouteParams>;
}
