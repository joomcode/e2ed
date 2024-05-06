import {CreateDevice, UserSignUp} from 'autotests/routes/apiRoutes';
import {Main} from 'autotests/routes/pageRoutes';
import {getRandomId} from 'e2ed/generators';
import {request} from 'e2ed/utils';

import type {ApiDevice, ApiDeviceParams, ApiUserParams, MobileDeviceModel} from 'autotests/types';

declare const apiUserParams: ApiUserParams;
declare const model: MobileDeviceModel;
declare const apiDeviceParams: ApiDeviceParams;

// @ts-expect-error: request require API route as first argument
void request(Main, {requestBody: apiUserParams});

// @ts-expect-error: wrong requestBody type
void request(UserSignUp, {requestBody: {}});

// @ts-expect-error: property requestBody should be
void request(UserSignUp, {});

// ok
void request(UserSignUp, {requestBody: apiUserParams});

void (async () => {
  // ok
  const {
    responseBody: {payload},
  } = await request(UserSignUp, {requestBody: apiUserParams});

  const {name}: {name: string} = payload;

  void name;

  // @ts-expect-error: property requestHeaders should be
  void request(CreateDevice, {
    requestBody: apiDeviceParams,
    routeParams: {model},
  });

  void request(CreateDevice, {
    requestBody: apiDeviceParams,
    // @ts-expect-error: wrong requestHeaders type
    requestHeaders: {foo: 'bar'},
    routeParams: {model},
  });

  const {responseBody} = await request(CreateDevice, {
    requestBody: apiDeviceParams,
    requestHeaders: {'x-my-request-id': getRandomId()},
    routeParams: {model},
  });

  const apiDevice: ApiDevice = responseBody.payload;

  void apiDevice;
})();
