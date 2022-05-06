import {PageRoute} from 'e2ed';

import type {Language} from 'e2ed/types';

type Params = Readonly<{language: Language}>;

/**
 * Route of the Main page.
 */
export class Main extends PageRoute<Params> {
  getPath(): string {
    return '/';
  }
}
