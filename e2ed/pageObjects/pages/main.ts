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
  readonly route: typeof pageRoutes.main = pageRoutes.main;

  get searchString(): Promise<string> {
    return components.input.value;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async willNavigateTo({language = 'de'}: PageParams): Promise<RouteParams> {
    return {language};
  }
}

export declare namespace Main {
  export type PathParams = RouteParams;
}

export const main = new Main();
