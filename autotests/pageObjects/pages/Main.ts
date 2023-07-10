import {Input} from 'autotests/pageObjects/components';
import {Main as MainRoute} from 'autotests/routes/pageRoutes';
import {createLocator, type Locator} from 'create-locator';
import {Page} from 'e2ed';
import {waitForAllRequestsComplete, waitForInterfaceStabilization} from 'e2ed/actions';
import {locatorIdSelector} from 'e2ed/selectors';

import type {Language} from 'autotests/types';
import type {GetParamsType, Selector} from 'e2ed/types';

type RouteParams = GetParamsType<MainRoute>;
type CustomPageParams = Partial<RouteParams> | undefined;

type MainLocator = Locator<{header: {}}>;

const mainPageLocator = createLocator<MainLocator, Selector>('google', {
  mapAttributes: (attributes) => locatorIdSelector(attributes['data-testid'] ?? ''),
  pathAttribute: 'data-testid',
});

/**
 * The Main (index) page.
 */
export class Main extends Page<CustomPageParams> {
  /**
   * Page language.
   */
  readonly language!: Language;

  override init(): void {
    const {language = 'de'} = this.pageParams ?? {};

    Object.assign<Main, Partial<Main>>(this, {language});
  }

  getRoute(): MainRoute {
    const {language} = this;

    return new MainRoute({language});
  }

  /**
   * Search input.
   */
  readonly searchInput = new Input('q');

  /**
   * Header selector.
   */
  readonly headerSelector = mainPageLocator.header();

  /**
   * Current search string.
   */
  get searchString(): Promise<string> {
    return this.searchInput.value;
  }

  /**
   * Type text into a search input.
   */
  typeIntoSearchInput(text: string): Promise<void> {
    return this.searchInput.type(text);
  }

  override async waitForPageLoaded(): Promise<void> {
    await waitForAllRequestsComplete(({url}) => {
      if (url.startsWith('https://adservice.google.com/')) {
        return false;
      }

      return true;
    });

    await waitForInterfaceStabilization(this.pageStabilizationInterval);
  }
}
