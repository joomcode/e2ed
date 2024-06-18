import {Input} from 'autotests/pageObjects/components';
import {Main as MainRoute} from 'autotests/routes/pageRoutes';
import {createSelectorByCss} from 'autotests/selectors';
import {createRootLocator, type Locator} from 'create-locator';
import {Page} from 'e2ed';
import {getCssSelectorFromAttributesChain} from 'e2ed/createLocator';
import {setReadonlyProperty} from 'e2ed/utils';

import type {Language} from 'autotests/types';
import type {GetParamsType, Selector} from 'e2ed/types';

type RouteParams = GetParamsType<MainRoute>;
type CustomPageParams = Partial<RouteParams> | undefined;

type MainLocator = Locator<{header: {}}>;

const mainPageLocator = createRootLocator<MainLocator, Selector>('google', {
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
   * Body selector.
   */
  readonly body = createSelectorByCss('body');

  /**
   * Header selector.
   */
  readonly header = mainPageLocator.header();

  /**
   * Page language.
   */
  readonly language!: Language;

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
}
