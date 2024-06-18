import {URL} from 'node:url';

import {ApiRoute} from '../../ApiRoute';
import {getFullMocksState} from '../../context/fullMocks';

import {assertValueIsDefined, assertValueIsNotNull} from '../asserts';
import {getFullPackConfig} from '../config';
import {E2edError} from '../error';

import type {FullMocksRouteParams, Url} from '../../types/internal';

/**
 * Special route for mocking all requests in "full mocks" mode.
 * @internal
 */
export class FullMocksRoute extends ApiRoute<FullMocksRouteParams> {
  static override getParamsFromUrl(url: Url): FullMocksRouteParams {
    const {fullMocks: fullMocksConfig} = getFullPackConfig();
    const fullMocksState = getFullMocksState();

    assertValueIsDefined(fullMocksState, 'fullMocksState is defined', {url});
    assertValueIsNotNull(fullMocksConfig, 'fullMocksConfig is not null', {url});

    const urlObject = new URL(url);
    const requestKind = fullMocksConfig.getRequestKind(urlObject);

    if (fullMocksState.testFullMocks[requestKind]) {
      return {fullMocksState, requestKind, urlObject};
    }

    throw new E2edError('Request should not be mocked', {requestKind, url});
  }

  getMethod(): 'GET' {
    return 'GET';
  }

  getPath(): string {
    return this.routeParams.urlObject.pathname;
  }

  override isMatchUrl(): true {
    return true;
  }
}
