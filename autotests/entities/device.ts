import {createDevice as apiCreateDevice} from 'autotests/api';
import {LogEventType} from 'e2ed/constants';
import {log} from 'e2ed/utils';

import type {Device, DeviceParams} from 'autotests/types';

/**
 * Create new device.
 */
export const createDevice = async ({
  cookies = [],
  model = 'samsung',
  version = '11',
}: DeviceParams = {}): Promise<Device> => {
  const device = await apiCreateDevice({
    cookies,
    input: 7,
    model,
    version,
  });

  log('New device have been created', {device}, LogEventType.Entity);

  return device;
};
