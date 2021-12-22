import type {RunHash, TestRunWithHooks} from '../../types/internal';

/**
 * Unificate all TestRun hashes at once.
 * @internal
 */
export const unificateRunHashes = (testRunsWithHooks: readonly TestRunWithHooks[]): void => {
  const {length} = String(testRunsWithHooks.length - 1);

  for (let index = 0; index < testRunsWithHooks.length; index += 1) {
    const testRunWithHooks = testRunsWithHooks[index];
    const {runHash} = testRunWithHooks;

    const clearRunHash = runHash.replace(/[# ?:/]+/g, '-') as RunHash;

    const uniqueRunHash = `${clearRunHash}-${String(index).padStart(length, '0')}` as RunHash;

    (testRunWithHooks as {runHash: RunHash}).runHash = uniqueRunHash;
  }
};
