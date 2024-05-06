import {URL} from 'node:url';

import {ApiRoute} from '../../ApiRoute';
import {getFullMocksState} from '../../context/fullMocks';

import {assertValueIsDefined, assertValueIsNotNull} from '../asserts';
import {getFullPackConfig} from '../config';
import {E2edError} from '../error';

import type {FullMocksRouteParams, Method, Url} from '../../types/internal';

/**
 * Special route for mocking all requests in "full mocks" mode.
 * @internal
 */
export class FullMocksRoute extends ApiRoute<FullMocksRouteParams> {
  static override getParamsFromUrl(url: Url, method: Method): FullMocksRouteParams {
    const {fullMocks: fullMocksConfig} = getFullPackConfig();
    const fullMocksState = getFullMocksState();

    assertValueIsDefined(fullMocksState, 'fullMocksState is defined', {method, url});
    assertValueIsNotNull(fullMocksConfig, 'fullMocksConfig is not null', {method, url});

    const urlObject = new URL(url);
    const requestKind = fullMocksConfig.getRequestKind(method, urlObject);

    if (fullMocksState.testFullMocks[requestKind]) {
      return {fullMocksState, method, requestKind, urlObject};
    }

    throw new E2edError('Request should not be mocked', {method, requestKind, url});
  }

  getMethod(): Method {
    return this.routeParams.method;
  }

  getPath(): string {
    return this.routeParams.urlObject.pathname;
  }

  override isMatchUrl(): true {
    return true;
  }
}
