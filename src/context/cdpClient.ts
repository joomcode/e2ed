import {useContext} from '../useContext';
import {assertValueIsDefined, assertValueIsUndefined} from '../utils/asserts';

import type {CdpClient} from '../types/internal';

/**
 * Raw versions of `getCdpClient` and `setCdpClient`.
 * @internal
 */
const [getRawCdpClient, setRawCdpClient] = useContext<CdpClient>();

/**
 * Get test run `cdpClient`.
 * @internal
 */
export const getCdpClient = (): CdpClient => {
  const cdpClient = getRawCdpClient();

  assertValueIsDefined(cdpClient, 'cdpClient is defined');

  return cdpClient;
};

/**
 * Set test `cdpClient` (can only be called once).
 * @internal
 */
export const setCdpClient: typeof setRawCdpClient = (cdpClient) => {
  const currentCdpClient = getRawCdpClient();

  assertValueIsUndefined(currentCdpClient, 'currentCdpClient is not defined', {cdpClient});

  return setRawCdpClient(cdpClient);
};
