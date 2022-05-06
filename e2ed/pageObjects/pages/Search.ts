import {MobilePage} from 'e2ed/pageObjects';
import {Search as SearchRoute} from 'e2ed/routes/pageRoutes';

import type {GetParamsType, Mutable} from 'e2ed/types';

type RouteParams = GetParamsType<SearchRoute>;
type CustomPageParams = Partial<RouteParams>;

/**
 * Search mobile page.
 */
export class Search extends MobilePage<CustomPageParams> {
  mobileDevice = 'iphone' as const;

  readonly query!: string;

  override init(): void {
    (this as Mutable<this>).query = this.pageParams.query ?? 'foo';
  }

  getRoute(): SearchRoute {
    const {query} = this;

    return new SearchRoute({query});
  }
}
