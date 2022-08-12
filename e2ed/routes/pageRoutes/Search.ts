import {URL} from 'node:url';

import {PageRoute} from 'e2ed';
import {assertValueIsTrue} from 'e2ed/utils';

import type {Url} from 'e2ed/types';

type Params = Readonly<{searchQuery: string}> | undefined;

/**
 * Route of the Search page.
 */
export class Search extends PageRoute<Params> {
  static override getParamsFromUrl(url: Url): Params {
    const {pathname, searchParams} = new URL(url);

    assertValueIsTrue(pathname === '/search', 'search route matches on url', {url});

    const searchQuery = searchParams.get('q') ?? '';

    return {searchQuery};
  }

  getPath(): string {
    const {searchQuery = 'bar'} = this.params ?? {};

    return `/search?q=${searchQuery}`;
  }
}
