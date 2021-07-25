import {PageRoute} from 'e2ed';

import type {pages} from 'e2ed/pageObjects';

type Params = pages.Main.PathParams;

/**
 * Route of the Main page.
 */
class Main extends PageRoute<Params> {
  getPath(): string {
    return '/';
  }
}

export const main = new Main();
