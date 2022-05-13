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

  readonly query!: string;

  override init(): void {
    const query = this.pageParams.query ?? 'foo';

    Object.assign<Search, Partial<Search>>(this, {query});
  }

  getRoute(): SearchRoute {
    const {query} = this;

    return new SearchRoute({query});
  }
}
