import {Page} from 'e2ed';

import type {MobileDevice} from 'e2ed/types';

type PageParams<CustomPageParams> = CustomPageParams & Readonly<{mobileDevice?: MobileDevice}>;

/**
 * Abstract mobile page.
 */
export abstract class MobilePage<CustomPageParams, RouteParams> extends Page<
  PageParams<CustomPageParams>,
  RouteParams
> {
  /**
   * Type of mobile device.
   */
  abstract readonly mobileDevice: MobileDevice;
}
