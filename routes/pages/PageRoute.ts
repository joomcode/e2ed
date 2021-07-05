import {DEFAULT_DEV_PORT} from 'e2e/constants';
import type {Language} from 'e2e/types';

import {Route} from '../Route';

/**
 * Abstract route for page.
 */
export abstract class PageRoute<
  Params extends {language: Language} = {language: Language}
> extends Route<Params> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOrigin(params?: Params): string {
    const {E2E_ORIGIN} = process.env;

    if (E2E_ORIGIN) {
      return E2E_ORIGIN.replace(/\/+$/, '');
    }

    return `http://localhost:${DEFAULT_DEV_PORT}`;
  }

  getUrl(params: Params): string {
    return `${this.getOrigin(params)}/${params.language}${this.getPath(params)}`;
  }
}
