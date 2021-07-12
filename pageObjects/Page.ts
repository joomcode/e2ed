import type {Route} from '../routes/Route';

/**
 * Abstract Page with base methods.
 */
export abstract class Page<Params = unknown> {
  /**
   * Page route.
   */
  abstract readonly route: Route<Params>;

  /**
   * This async method is called before navigating to the page.
   * It accepts some route parameters, and should return the required route parameters.
   */
  async willNavigateTo(params: Params): Promise<Params> {
    return params;
  }
}
