import {Route} from './Route';

import type {Url} from './types/internal';

/**
 * Abstract route for page.
 */
export abstract class PageRoute<Params = undefined> extends Route<Params> {
  getOrigin(): Url {
    const {E2ED_ORIGIN} = process.env;

    if (E2ED_ORIGIN) {
      return E2ED_ORIGIN.replace(/\/+$/, '') as Url;
    }

    return 'http://localhost' as Url;
  }
}
