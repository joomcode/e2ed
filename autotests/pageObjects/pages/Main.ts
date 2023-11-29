import {Input} from 'autotests/pageObjects/components';
import {Main as MainRoute} from 'autotests/routes/pageRoutes';
import {createSelectorByCss} from 'autotests/selectors';
import {createLocator, type Locator} from 'create-locator';
import {Page} from 'e2ed';
import {waitForAllRequestsComplete, waitForInterfaceStabilization} from 'e2ed/actions';
import {getCssSelectorFromAttributesChain} from 'e2ed/createLocator';

import type {Language} from 'autotests/types';
import type {GetParamsType, Selector} from 'e2ed/types';

type RouteParams = GetParamsType<MainRoute>;
type CustomPageParams = Partial<RouteParams> | undefined;

type MainLocator = Locator<{header: {}}>;

const mainPageLocator = createLocator<MainLocator, Selector>('google', {
  mapAttributesChain: (attributesChain) => {
    const cssSelector = getCssSelectorFromAttributesChain(attributesChain);

    return createSelectorByCss(cssSelector);
  },
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
   * Body selector.
   */
  readonly body = createSelectorByCss('body');

  /**
   * Header selector.
   */
  readonly header = mainPageLocator.header();

  /**
   * Search input.
   */
  readonly searchInput = new Input('q');

  /**
   * Current value of search query.
   */
  get searchQuery(): Promise<string> {
    return this.searchInput.value;
  }

  /**
   * Type text into a search input.
   */
  typeIntoSearchInput(text: string): Promise<void> {
    return this.searchInput.type(text);
  }

  override async waitForPageLoaded(): Promise<void> {
    await waitForAllRequestsComplete(
      ({url}) => {
        if (
          url.startsWith('https://adservice.google.com/') ||
          url.startsWith('https://play.google.com/')
        ) {
          return false;
        }

        return true;
      },
      {maxIntervalBetweenRequestsInMs: this.maxIntervalBetweenRequestsInMs},
    );

    await waitForInterfaceStabilization(this.pageStabilizationInterval);
  }
}
