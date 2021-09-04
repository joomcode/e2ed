import {ApiRoute as BaseApiRoute} from 'e2ed';

/**
 * Abstract custom route for API requests.
 */
export abstract class ApiRoute<Params = unknown> extends BaseApiRoute<Params> {
  override getOrigin(): string {
    return process.env.E2ED_API_ORIGIN || 'http://localhost:3000';
  }
}
