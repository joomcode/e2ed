import {Page} from 'e2ed';

import type {MobileDeviceModel} from 'autotests/types';

type PageParams<CustomPageParams> = CustomPageParams & Readonly<{mobileDevice?: MobileDeviceModel}>;

/**
 * Abstract mobile page.
 */
export abstract class MobilePage<CustomPageParams> extends Page<PageParams<CustomPageParams>> {
  /**
   * Type of mobile device.
   */
  abstract readonly mobileDevice: MobileDeviceModel;
}
