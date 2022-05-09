import {ApiRoute} from 'e2ed/routes';

type Params = Readonly<{model: string}>;

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
