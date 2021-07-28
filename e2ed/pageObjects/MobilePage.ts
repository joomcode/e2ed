import {Page} from 'e2ed';

/**
 * Abstract mobile Page.
 */
export abstract class MobilePage<Params = unknown> extends Page<Params> {
  /**
   * Type of mobile device.
   */
  abstract readonly mobileDevice: string;
}
