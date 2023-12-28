import {getFullPackConfig} from '../config';

import type {TestStaticOptions} from '../../types/internal';

/**
 * Get flag "is test included in pack" for filtering tests by the complete test options.
 * @internal
 */
export const getIsTestIncludedInPack = (testStaticOptions: TestStaticOptions): boolean => {
  const {filterTestsIntoPack} = getFullPackConfig();

  return filterTestsIntoPack(testStaticOptions);
};
