import {CreateDevice} from 'e2ed/routes/apiRoutes';
import {request} from 'e2ed/utils';

import type {ApiDevice, ApiDeviceParams, Device} from 'e2ed/types';

type Input = ApiDeviceParams;

type Output = Readonly<{
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
    output: {payload: apiDevice},
  } = await request<Input, Output>({
    input: params,
    method: createDeviceRoute.getMethod(),
    url,
  });

  return apiDevice;
};
