import {ApiRoute} from 'autotests/routes';
import {assertValueIsTrue} from 'e2ed/utils';

import type {ApiGetUsersRequest, ApiGetUsersResponse} from 'autotests/types';
import type {Url} from 'e2ed/types';

type Params = Readonly<{delay?: number}> | undefined;

const pathStart = '/api/users';

/**
 * Client API route for getting users list.
 */
export class GetUsers extends ApiRoute<Params, ApiGetUsersRequest, ApiGetUsersResponse> {
  static override getParamsFromUrlOrThrow(url: Url): Params {
    const urlObject = new URL(url);

    assertValueIsTrue(
      urlObject.pathname.startsWith(pathStart),
      'url pathname starts with correct path',
      {urlObject},
    );

    const delay = Number(urlObject.searchParams.get('delay'));

    if (delay >= 0) {
      assertValueIsTrue(Number.isInteger(delay), 'url has correct delay', {delay, urlObject});

      return {delay};
    }

    return {};
  }

  getMethod(): 'GET' {
    return 'GET';
  }

  override getOrigin(): Url {
    return 'https://reqres.in' as Url;
  }

  getPath(): string {
    const {delay} = this.routeParams ?? {};

    return delay !== undefined ? `${pathStart}?delay=${delay}` : pathStart;
  }
}
