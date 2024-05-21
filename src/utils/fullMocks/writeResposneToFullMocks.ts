import {getFullMocksState} from '../../context/fullMocks';

import {assertValueIsDefined, assertValueIsNotNull} from '../asserts';
import {getFullPackConfig} from '../config';
import {getHeaderValue} from '../requestHooks';
import {setReadonlyProperty} from '../setReadonlyProperty';

import type {Mutable, ResponseWithRequest} from '../../types/internal';

/**
 * Writes `ResponseWithRequest` to full mocks of test.
 * @internal
 */
export const writeResposneToFullMocks = (responseWithRequest: ResponseWithRequest): void => {
  const {fullMocks: fullMocksConfig} = getFullPackConfig();
  const fullMocksState = getFullMocksState();

  assertValueIsDefined(fullMocksState, 'fullMocksState is defined', {responseWithRequest});
  assertValueIsNotNull(fullMocksConfig, 'fullMocksConfig is not null', {responseWithRequest});

  const contentType = getHeaderValue(responseWithRequest.responseHeaders, 'content-type');
  const contentTypeString = (Array.isArray(contentType) ? contentType : [contentType])
    .join(',')
    .toLowerCase();

  if (!contentTypeString.includes('application/json')) {
    return;
  }

  const {url} = responseWithRequest.request;
  const urlObject = new URL(url);
  const requestKind = fullMocksConfig.getRequestKind(responseWithRequest.request.method, urlObject);

  const responseToWrite = fullMocksConfig.getResponseToWriteToFullMocks(
    requestKind,
    responseWithRequest,
  );

  if (responseToWrite === undefined) {
    return;
  }

  const {testFullMocks} = fullMocksState;

  if (!testFullMocks[requestKind]) {
    setReadonlyProperty(testFullMocks, requestKind, []);
  }

  const listOfResponses = testFullMocks[requestKind];

  assertValueIsDefined(listOfResponses, 'listOfResponses is defined', {responseWithRequest});

  (listOfResponses as Mutable<typeof listOfResponses>).push(responseToWrite);
};
