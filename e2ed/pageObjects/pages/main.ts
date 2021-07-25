import {Page} from 'e2ed';
import {components} from 'e2ed/pageObjects';
import {pageRoutes} from 'e2ed/routes';

import type {Language} from 'e2ed/types';

type RouteParams = Readonly<{language: Language}>;

type PageParams = Partial<RouteParams>;

/**
 * Terms Of Service page.
 */
class Main extends Page<RouteParams> {
  readonly route = pageRoutes.main;

  readonly searchString = components.input.value;

  // eslint-disable-next-line @typescript-eslint/require-await
  async willNavigateTo({language = 'en'}: PageParams = {}): Promise<RouteParams> {
    return {language};
  }
}

export declare namespace Main {
  export type PathParams = RouteParams;
}

export const main = new Main();
