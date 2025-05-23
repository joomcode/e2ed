import {URL} from 'node:url';

import {ApiRoute} from 'autotests/routes';
import {assertValueIsTrue} from 'e2ed/utils';

import type {ApiCreateProductRequest, ApiCreateProductResponse, ProductId} from 'autotests/types';
import type {Url} from 'e2ed/types';

type Params = Readonly<{id: ProductId; size: number}>;

const pathStart = '/products/add';

/**
 * Test API route for creating a product.
 */
export class CreateProduct extends ApiRoute<
  Params,
  ApiCreateProductRequest,
  ApiCreateProductResponse
> {
  static override getParamsFromUrlOrThrow(url: Url): Params {
    const urlObject = new URL(url);

    assertValueIsTrue(
      urlObject.pathname.startsWith(pathStart),
      'url pathname starts with correct path',
      {urlObject},
    );

    const id = Number(urlObject.searchParams.get('id')) as ProductId;
    const size = Number(urlObject.searchParams.get('size'));

    assertValueIsTrue(Number.isInteger(id), 'url has correct id', {id, size, urlObject});
    assertValueIsTrue(Number.isInteger(size), 'url has correct size', {id, size, urlObject});

    return {id, size};
  }

  getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    const {id, size} = this.routeParams;

    return `${pathStart}?id=${id}&size=${size}`;
  }
}
