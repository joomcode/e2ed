import type {Brand} from 'e2ed/types';

/**
 * Device id.
 */
export type DeviceId = Brand<string, 'DeviceId'>;

/**
 * API params for device creation.
 */
export type ApiDeviceParams = Readonly<{
  cookies: readonly string[];
  input: number;
  model: MobileDevice;
  version: string;
}>;

/**
 * Params for device creation.
 */
export type DeviceParams = Partial<ApiDeviceParams>;

/**
 * Device object.
 */
export type Device = Readonly<ApiDeviceParams & {id: DeviceId}>;

/**
 * Device object returned by API.
 */
export type ApiDevice = Device;

/**
 * Mobile device type.
 */
export type MobileDevice = 'iphone' | 'samsung';
