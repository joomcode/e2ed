import {MobilePage} from 'autotests/pageObjects';
import {Search as SearchRoute} from 'autotests/routes/pageRoutes';
import {waitForAllRequestsComplete} from 'e2ed/actions';
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

  override async waitForPageLoaded(): Promise<void> {
    await waitForAllRequestsComplete(
      ({url}) => {
        if (
          url.startsWith('https://encrypted-tbn0.gstatic.com/') ||
          url.startsWith('https://www.google.com/gen_204?') ||
          url.startsWith('https://lh5.googleusercontent.com/') ||
          url.startsWith('https://play.google.com/') ||
          url.startsWith('https://www.googleadservices.com/') ||
          url.startsWith('https://www.youtube.com/embed/')
        ) {
          return false;
        }

        return true;
      },
      {maxIntervalBetweenRequestsInMs: this.maxIntervalBetweenRequestsInMs, timeout: 8_000},
    );
  }
}
