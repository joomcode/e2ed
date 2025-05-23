import {Input} from 'autotests/pageObjects/components';
import {Main as MainRoute} from 'autotests/routes/pageRoutes';
import {createSelector} from 'autotests/selectors';
import {Page} from 'e2ed';
import {waitForAllRequestsComplete} from 'e2ed/actions';
import {setReadonlyProperty} from 'e2ed/utils';

import type {Language} from 'autotests/types';
import type {GetParamsType, Selector} from 'e2ed/types';

type RouteParams = GetParamsType<MainRoute>;
type CustomPageParams = Partial<RouteParams> | undefined;

/**
 * The Main (index) page.
 */
export class Main extends Page<CustomPageParams> {
  /**
   * Body selector.
   */
  readonly body: Selector = createSelector('body');

  /**
   * Header selector.
   */
  readonly header: Selector = createSelector('header');

  /**
   * Page language.
   */
  readonly language!: Language;

  /**
   * Search input.
   */
  readonly searchInput: Input = new Input('q');

  /**
   * Current value of search query.
   */
  get searchQuery(): Promise<string> {
    return this.searchInput.value;
  }

  getRoute(): MainRoute {
    const {language} = this;

    return new MainRoute({language});
  }

  override init(this: Main): void {
    const {language = 'de'} = this.pageParams ?? {};

    setReadonlyProperty(this, 'language', language);
  }

  /**
   * Type text into a search input.
   */
  typeIntoSearchInput(text: string): Promise<void> {
    return this.searchInput.type(text);
  }

  override async waitForPageLoaded(): Promise<void> {
    await this.waitForDomContentLoaded();

    await waitForAllRequestsComplete(
      ({url}) => {
        if (
          url.startsWith('https://browser.events.data.msn.com/') ||
          url.startsWith('https://img-s-msn-com.akamaized.net/') ||
          url.startsWith('https://rewards.bing.com/widget/') ||
          url.startsWith('https://th.bing.com/th?id=') ||
          url.startsWith('https://www.bing.com/th?id=')
        ) {
          return false;
        }

        return true;
      },
      {maxIntervalBetweenRequestsInMs: this.maxIntervalBetweenRequestsInMs, timeout: 8_000},
    );
  }
}
