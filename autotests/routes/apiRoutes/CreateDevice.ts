import {ApiRoute} from 'autotests/routes';

import type {
  ApiCreateDeviceRequest,
  ApiCreateDeviceResponse,
  MobileDeviceModel,
} from 'autotests/types';

type Params = Readonly<{model: MobileDeviceModel}>;

/**
 * Test API route for creating a device.
 */
export class CreateDevice extends ApiRoute<
  Params,
  ApiCreateDeviceRequest,
  ApiCreateDeviceResponse
> {
  getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    const {model} = this.routeParams;

    return `/device/${model}/create`;
  }
}
