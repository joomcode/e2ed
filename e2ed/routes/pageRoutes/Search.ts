import {URL} from 'node:url';

import {PageRoute} from 'e2ed';
import {assertValueIsTrue} from 'e2ed/utils';

import type {Url} from 'e2ed/types';

type Params = undefined | Readonly<{query: string}>;

/**
 * Route of the Search page.
 */
export class Search extends PageRoute<Params> {
  static override getParamsFromUrl(url: Url): Params {
    const {pathname, searchParams} = new URL(url);

    assertValueIsTrue(pathname === '/search', 'search route matches on url', {url});

    const query = searchParams.get('q') || '';

    return {query};
  }

  getPath(): string {
    const {query = 'bar'} = this.params ?? {};

    return `/search?q=${query}`;
  }
}
