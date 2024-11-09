import {INTERNAL_REPORTS_DIRECTORY_PATH} from '../../constants/internal';

import {assertValueIsTrue} from '../asserts';

/**
 * Get output directory name of test in `internal` directory.
 * @internal
 */
export const getOutputDirectoryName = (outputDirectory: string): string => {
  const indexOfInternalDirectory = outputDirectory.indexOf(INTERNAL_REPORTS_DIRECTORY_PATH);

  assertValueIsTrue(indexOfInternalDirectory > 0, 'indexOfInternalDirectory greater than 0', {
    outputDirectory,
  });

  return outputDirectory.slice(
    INTERNAL_REPORTS_DIRECTORY_PATH.length + indexOfInternalDirectory + 1,
  );
};
