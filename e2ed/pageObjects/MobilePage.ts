import {Page} from 'e2ed';

/**
 * Abstract mobile Page.
 */
export abstract class MobilePage<PageParams, RouteParams> extends Page<PageParams, RouteParams> {
  /**
   * Type of mobile device.
   */
  abstract readonly mobileDevice: string;
}
