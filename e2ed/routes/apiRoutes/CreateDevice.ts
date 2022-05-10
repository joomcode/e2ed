import {ApiRoute} from 'e2ed/routes';

import type {MobileDevice} from 'e2ed/types';

type Params = Readonly<{model: MobileDevice}>;

/**
 * Test API route for creating a device.
 */
export class CreateDevice extends ApiRoute<Params> {
  getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    const {model} = this.params;

    return `/device/${model}/create`;
  }
}
