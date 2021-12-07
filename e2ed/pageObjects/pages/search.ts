import {MobilePage} from 'e2ed/pageObjects';
import {pageRoutes} from 'e2ed/routes';

import type {GetParamsType} from 'e2ed/types';

type RouteParams = GetParamsType<typeof pageRoutes.search>;

type CustomPageParams = Partial<RouteParams>;

type PageParams = GetParamsType<Search>;

/**
 * Search (index) page.
 */
class Search extends MobilePage<CustomPageParams, RouteParams> {
  readonly route: typeof pageRoutes.search = pageRoutes.search;

  mobileDevice = 'iphone' as const;

  /**
   * Convert page parameters to route parameters,
   * and perform the necessary actions before opening the search page.
   */
  willNavigateTo({query = 'foo'}: PageParams): Promise<RouteParams> {
    return Promise.resolve({query});
  }
}

export const search = new Search();
