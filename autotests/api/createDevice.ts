import {CreateDevice} from 'autotests/routes/apiRoutes';
import {getRandomId} from 'e2ed/generators';
import {request} from 'e2ed/utils';

import type {ApiDeviceParams, Device} from 'autotests/types';

/**
 * Creates new device by API request.
 */
export const createDevice = async (params: ApiDeviceParams): Promise<Device> => {
  const {model} = params;

  const {
    responseBody: {payload: apiDevice},
  } = await request(CreateDevice, {
    requestBody: params,
    requestHeaders: {'x-my-request-id': getRandomId()},
    routeParams: {model},
  });

  return apiDevice;
};
