import {AUTOTESTS_DIRECTORY_PATH} from '../../constants/internal';

/**
 * Returns `true`, if current node arguments for TestCafe has browsers arg, and `false` otherwise.
 * @internal
 */
export const hasBrowsersArg = (): boolean => {
  const browsersArg = process.argv[2];

  if (browsersArg === undefined) {
    return false;
  }

  return !browsersArg.startsWith('-') && !browsersArg.startsWith(AUTOTESTS_DIRECTORY_PATH);
};
