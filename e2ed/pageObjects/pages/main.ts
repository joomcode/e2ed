import {Page} from 'e2ed';
import {Input} from 'e2ed/pageObjects/components';
import {mainRoute} from 'e2ed/routes/pageRoutes';

import type {GetParamsType} from 'e2ed/types';

type RouteParams = GetParamsType<typeof mainRoute>;

type CustomPageParams = Partial<RouteParams>;

type PageParams = GetParamsType<Main>;

/**
 * Main (index) page.
 */
class Main extends Page<CustomPageParams, RouteParams> {
  readonly route: typeof mainRoute = mainRoute;

  /**
   * Search input.
   */
  readonly searchInput = new Input('q');

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

  /**
   * Convert page parameters to route parameters,
   * and perform the necessary actions before opening the main page.
   */
  willNavigateTo({language = 'de'}: PageParams): Promise<RouteParams> {
    return Promise.resolve({language});
  }
}

export const main = new Main();
