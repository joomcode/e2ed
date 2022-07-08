import {MobilePage} from 'e2ed/pageObjects';
import {Search as SearchRoute} from 'e2ed/routes/pageRoutes';

import type {GetParamsType} from 'e2ed/types';

type RouteParams = GetParamsType<SearchRoute>;
type CustomPageParams = Partial<RouteParams>;

/**
 * The search mobile page.
 */
export class Search extends MobilePage<CustomPageParams> {
  readonly mobileDevice = 'iphone' as const;

  readonly searchQuery!: string;

  override init(): void {
    const searchQuery = this.pageParams.searchQuery ?? 'foo';

    Object.assign<Search, Partial<Search>>(this, {searchQuery});
  }

  getRoute(): SearchRoute {
    const {searchQuery} = this;

    return new SearchRoute({searchQuery});
  }
}
