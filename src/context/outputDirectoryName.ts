import {useContext} from '../useContext';
import {assertValueIsDefined, assertValueIsUndefined} from '../utils/asserts';

/**
 * Raw get and set test output directory name.
 */
const [getRawOutputDirectoryName, setRawOutputDirectoryName] = useContext<string>();

/**
 * Get test output directory name.
 */
export const getOutputDirectoryName = (): string => {
  const outputDirectoryName = getRawOutputDirectoryName();

  assertValueIsDefined(outputDirectoryName, 'outputDirectoryName is defined');

  return outputDirectoryName;
};

/**
 * Set test output directory name.
 * @internal
 */
export const setOutputDirectoryName: typeof setRawOutputDirectoryName = (outputDirectoryName) => {
  const currentOutputDirectoryName = getRawOutputDirectoryName();

  assertValueIsUndefined(currentOutputDirectoryName, 'currentOutputDirectoryName is not defined', {
    outputDirectoryName,
  });

  setRawOutputDirectoryName(outputDirectoryName);
};
