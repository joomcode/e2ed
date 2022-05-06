import {Page} from 'e2ed';

import type {DeepReadonly, MobileDevice} from 'e2ed/types';

type PageParams<CustomPageParams> = CustomPageParams & DeepReadonly<{mobileDevice?: MobileDevice}>;

/**
 * Abstract mobile page.
 */
export abstract class MobilePage<CustomPageParams> extends Page<PageParams<CustomPageParams>> {
  /**
   * Type of mobile device.
   */
  abstract readonly mobileDevice: MobileDevice;
}
