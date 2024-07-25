import {MobilePage} from 'autotests/pageObjects';
import {Search as SearchRoute} from 'autotests/routes/pageRoutes';
import {setReadonlyProperty} from 'e2ed/utils';

import type {GetParamsType} from 'e2ed/types';

type RouteParams = GetParamsType<SearchRoute>;
type CustomPageParams = Partial<RouteParams>;

/**
 * The Search mobile page.
 */
export class Search extends MobilePage<CustomPageParams> {
  /**
   * The mobile device on which the page is open.
   */
  readonly mobileDevice = 'iphone' as const;

  /**
   * The search query of the page.
   */
  readonly searchQuery!: string;

  getRoute(): SearchRoute {
    const {searchQuery} = this;

    return new SearchRoute({searchQuery});
  }

  override init(this: Search): void {
    const searchQuery = this.pageParams.searchQuery ?? 'foo';

    setReadonlyProperty(this, 'searchQuery', searchQuery);
  }
}
