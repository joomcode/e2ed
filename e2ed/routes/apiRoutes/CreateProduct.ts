import {ApiRoute} from 'e2ed/routes';
import {assertValueIsTrue} from 'e2ed/utils';

import type {Url} from 'e2ed/types';

type Params = Readonly<{id: number; size: number}>;

const pathStart = '/product/';

/**
 * Test API route for creating a product.
 */
export class CreateProduct extends ApiRoute<Params> {
  static override getParamsFromUrl(url: Url): Params {
    const urlObject = new URL(url);

    assertValueIsTrue(
      urlObject.pathname.startsWith(pathStart),
      'url pathname starts with correct path',
      {urlObject},
    );

    const id = Number(urlObject.pathname.slice(pathStart.length));
    const size = Number(urlObject.searchParams.get('size'));

    assertValueIsTrue(Number.isInteger(id), 'url has correct id', {id, size, urlObject});
    assertValueIsTrue(Number.isInteger(size), 'url has correct size', {id, size, urlObject});

    return {id, size};
  }

  getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    const {id, size} = this.params;

    return `${pathStart}${id}?size=${size}`;
  }
}
