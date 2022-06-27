import {assertValueIsFalse, assertValueIsTrue} from '../asserts';

import type {RunId, TestFilePath, TestRunWithHooks} from '../../types/internal';

type VisitChainResult = Readonly<{
  chain: readonly TestRunWithHooks[];
  filePath: TestFilePath;
  meetOtherChain: boolean;
  name: string;
}>;

/**
 * Assert that test names and file paths inside one retry are unique.
 * @internal
 */
export const assertThatTestNamesAndFilePathsAreUniqueInOneRetry = (
  testRunsWithHooks: readonly TestRunWithHooks[],
): void => {
  const visited: Record<RunId, TestRunWithHooks> = {};
  const chainByName: Record<string, readonly TestRunWithHooks[]> = {};
  const filePathsHash: Record<TestFilePath, true> = {};

  const testRunByRunId: Record<RunId, TestRunWithHooks> = {};

  for (const testRunWithHooks of testRunsWithHooks) {
    testRunByRunId[testRunWithHooks.runId] = testRunWithHooks;
  }

  /**
   * Visit chain of TestRuns by previousRunId field.
   */
  const visitChain = (testRunWithHooks: TestRunWithHooks): VisitChainResult => {
    const {filePath, name} = testRunWithHooks;
    const chain = [];

    let currentTestRun: TestRunWithHooks | undefined = testRunWithHooks;

    while (currentTestRun && !(currentTestRun.runId in visited)) {
      assertValueIsTrue(currentTestRun.filePath === filePath, 'filePaths are not equal', {
        currentTestRun,
        filePath,
      });
      assertValueIsTrue(currentTestRun.name === name, 'names are not equal', {
        currentTestRun,
        name,
      });

      visited[currentTestRun.runId] = currentTestRun;
      chain.push(currentTestRun);

      const {previousRunId}: {previousRunId: RunId | undefined} = currentTestRun;

      currentTestRun = previousRunId ? testRunByRunId[previousRunId] : undefined;

      assertValueIsTrue(
        currentTestRun !== testRunWithHooks,
        'currentTestRun equals initial testRunWithHooks',
        {currentTestRun},
      );
    }

    if (currentTestRun !== undefined) {
      assertValueIsTrue(currentTestRun.filePath === filePath, 'filePaths are not equals', {
        currentTestRun,
        filePath,
      });
      assertValueIsTrue(currentTestRun.name === name, 'names are not equals', {
        currentTestRun,
        name,
      });
      assertValueIsTrue(
        chainByName[name][0] === currentTestRun,
        'the chain does not start with currentTestRun',
        {chain: chainByName[name], currentTestRun, name},
      );
    }

    return {chain, filePath, meetOtherChain: currentTestRun !== undefined, name};
  };

  for (const testRunWithHooks of testRunsWithHooks) {
    if (testRunWithHooks.runId in visited) {
      continue;
    }

    const {chain, filePath, meetOtherChain, name} = visitChain(testRunWithHooks);

    if (meetOtherChain) {
      const oldChain = chainByName[name];

      (oldChain as TestRunWithHooks[]).unshift(...chain);

      continue;
    }

    assertValueIsFalse(filePath in filePathsHash, 'filePath already visited', {testRunWithHooks});
    assertValueIsFalse(name in chainByName, 'name already visited', {
      chain: chainByName[name],
      testRunWithHooks,
    });

    filePathsHash[filePath] = true;
    chainByName[name] = chain;
  }
};
