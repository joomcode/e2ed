import type {TestOptions} from '../../types/internal';

/**
 * Returns `true`, if test options different, and `false` otherwise.
 * @internal
 */
export const getIsTestOptionsDifferent = (
  firstOptions: TestOptions,
  secondOptions: TestOptions,
): boolean => {
  const firstMeta = {...firstOptions.meta, skipReason: undefined};
  const secondMeta = {...secondOptions.meta, skipReason: undefined};

  return (
    JSON.stringify({...firstOptions, meta: firstMeta}) !==
    JSON.stringify({...secondOptions, meta: secondMeta})
  );
};
