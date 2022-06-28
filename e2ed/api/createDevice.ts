import {CreateDevice} from 'e2ed/routes/apiRoutes';
import {request} from 'e2ed/utils';

import type {ApiDevice, ApiDeviceParams, Device} from 'e2ed/types';

type RequestBody = ApiDeviceParams;

type ResponseBody = Readonly<{
  payload: ApiDevice;
}>;

/**
 * Create new device by API request.
 */
export const createDevice = async (params: ApiDeviceParams): Promise<Device> => {
  const {model} = params;
  const createDeviceRoute = new CreateDevice({model});

  const url = createDeviceRoute.getUrl();

  const {
    responseBody: {payload: apiDevice},
  } = await request<RequestBody, ResponseBody>({
    method: createDeviceRoute.getMethod(),
    requestBody: params,
    url,
  });

  return apiDevice;
};
