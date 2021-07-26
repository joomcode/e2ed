import {Page} from 'e2ed';
import {components} from 'e2ed/pageObjects';
import {pageRoutes} from 'e2ed/routes';

import type {Language} from 'e2ed/types';

type RouteParams = Readonly<{language: Language}>;

type PageParams = Partial<RouteParams>;

/**
 * Main (index) page.
 */
class Main extends Page<RouteParams> {
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

export declare namespace Main {
  export type PathParams = RouteParams;
}

export const main = new Main();
