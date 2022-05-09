import {URL} from 'node:url';

import {PageRoute} from 'e2ed';

import type {Url} from 'e2ed/types';

type Params = undefined | Readonly<{query: string}>;

/**
 * Route of the Search page.
 */
export class Search extends PageRoute<Params> {
  override getParamsFromUrl(url: Url): Params {
    const {searchParams} = new URL(url);
    const query = searchParams.get('q') || '';

    return {query};
  }

  getPath(): string {
    const {query = 'bar'} = this.params ?? {};

    return `/search?q=${query}`;
  }
}
