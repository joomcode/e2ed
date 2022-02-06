import {PageRoute} from 'e2ed';

import type {Language} from 'e2ed/types';

type Params = Readonly<{language: Language}>;

/**
 * Route of the Main page.
 */
class MainRoute extends PageRoute<Params> {
  getPath(): string {
    return '/';
  }
}

export const mainRoute = new MainRoute();
