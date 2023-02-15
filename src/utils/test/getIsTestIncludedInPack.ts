import {getFullPackConfig} from '../getFullPackConfig';

import type {TestStaticOptions} from '../../types/internal';

/**
 * Get flag isTestIncludedInPack for filtering tests by the complete test options.
 * @internal
 */
export const getIsTestIncludedInPack = (testStaticOptions: TestStaticOptions): boolean => {
  const {isTestIncludedInPack} = getFullPackConfig();

  return isTestIncludedInPack(testStaticOptions);
};
