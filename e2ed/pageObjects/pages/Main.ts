import {Page} from 'e2ed';
import {createTestId} from 'e2ed/createTestId';
import {Input} from 'e2ed/pageObjects/components';
import {Main as MainRoute} from 'e2ed/routes/pageRoutes';
import {testIdSelector} from 'e2ed/selectors';

import type {GetParamsType, Language} from 'e2ed/types';

type RouteParams = GetParamsType<MainRoute>;
type CustomPageParams = undefined | Partial<RouteParams>;

const mainPageTestId = createTestId<{header: unknown}>({prefix: 'google'});

/**
 * The main (index) page.
 */
export class Main extends Page<CustomPageParams> {
  readonly language!: Language;

  override init(): void {
    const {language = 'de'} = this.pageParams ?? {};

    Object.assign<Main, Partial<Main>>(this, {language});
  }

  getRoute(): MainRoute {
    const {language} = this;

    return new MainRoute({language});
  }

  override pageStabilizationInterval = 2_500;

  /**
   * Search input.
   */
  readonly searchInput = new Input('q');

  /**
   * Header selector.
   */
  readonly headerSelector = testIdSelector(mainPageTestId.header);

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
