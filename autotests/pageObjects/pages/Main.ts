import {Input} from 'autotests/pageObjects/components';
import {Main as MainRoute} from 'autotests/routes/pageRoutes';
import {Page} from 'e2ed';
import {createLocator, type Locator} from 'e2ed/createLocator';
import {locatorIdSelector} from 'e2ed/selectors';

import type {Language} from 'autotests/types';
import type {GetParamsType, Selector} from 'e2ed/types';

type RouteParams = GetParamsType<MainRoute>;
type CustomPageParams = Partial<RouteParams> | undefined;

// eslint-disable-next-line @typescript-eslint/ban-types
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
}
