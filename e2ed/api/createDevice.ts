import {CreateDevice} from 'e2ed/routes/apiRoutes';
import {getRandomId, request} from 'e2ed/utils';

import type {ApiDeviceParams, Device} from 'e2ed/types';

/**
 * Create new device by API request.
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
