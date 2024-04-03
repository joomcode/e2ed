import {useContext} from '../useContext';
import {assertValueIsUndefined} from '../utils/asserts';

import type {CdpClient} from '../types/internal';

/**
 * Raw versions of `getCdpClient` and `setCdpClient`.
 * @internal
 */
const [getCdpClient, setRawCdpClient] = useContext<CdpClient>();

/**
 * Get test run `cdpClient`.
 * @internal
 */
export {getCdpClient};

/**
 * Set test `cdpClient` (can only be called once).
 * @internal
 */
export const setCdpClient: typeof setRawCdpClient = (cdpClient) => {
  const currentCdpClient = getCdpClient();

  assertValueIsUndefined(currentCdpClient, 'currentCdpClient is not defined', {cdpClient});

  return setRawCdpClient(cdpClient);
};
