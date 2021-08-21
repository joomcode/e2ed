import {Page} from 'e2ed';
import {components} from 'e2ed/pageObjects';
import {pageRoutes} from 'e2ed/routes';

import type {GetParamsType} from 'e2ed/types';

type RouteParams = GetParamsType<typeof pageRoutes.main>;

type CustomPageParams = Partial<RouteParams>;

type PageParams = GetParamsType<Main>;

/**
 * Main (index) page.
 */
class Main extends Page<CustomPageParams, RouteParams> {
  readonly route: typeof pageRoutes.main = pageRoutes.main;

  /**
   * Search input.
   */
  readonly searchInput = new components.Input('q');

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

  willNavigateTo({language = 'de'}: PageParams): Promise<RouteParams> {
    return Promise.resolve({language});
  }
}

export const main = new Main();
