import {PageRoute} from 'e2ed';

import type {Language} from 'autotests/types';

type Params = Readonly<{language: Language}>;

/**
 * Route of the Main page.
 */
export class Main extends PageRoute<Params> {
  getPath(): string {
    return '/';
  }
}
