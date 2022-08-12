import {setRawMeta} from '../../context/meta';
import {setRunId} from '../../context/runId';
import {isTestSkipped} from '../../hooks';

import {registerStartTestRunEvent} from '../events';
import {getRelativeTestFilePath} from '../getRelativeTestFilePath';

import {getTestFnAndReject} from './getTestFnAndReject';

import type {
  E2edEnvironment,
  RunId,
  RunLabel,
  Test,
  TestController,
  TestStaticOptions,
  UtcTimeInMs,
} from '../../types/internal';

type Options = Readonly<{
  previousRunId: RunId | undefined;
  runId: RunId;
  test: Test;
  testController: TestController;
}>;

/**
 * Internal before test hook with TestRun state.
 * @internal
 */
export const beforeTest = ({previousRunId, runId, test, testController}: Options): void => {
  setRunId(runId);
  setRawMeta(test.options.meta);

  const {filename: absoluteFilePath} = testController.testRun.test.testFile;
  const filePath = getRelativeTestFilePath(absoluteFilePath);
  const testStaticOptions: TestStaticOptions = {
    filePath,
    name: test.name,
    options: test.options,
  };
  const isSkipped = isTestSkipped(testStaticOptions);

  const {reject, testFnWithReject} = getTestFnAndReject({
    isSkipped,
    runId,
    testFn: test.testFn,
    testTimeout: test.options.testTimeout,
  });

  const runLabel = (process.env as E2edEnvironment).E2ED_RUN_LABEL as RunLabel;
  const utcTimeInMs = Date.now() as UtcTimeInMs;

  registerStartTestRunEvent({
    ...testStaticOptions,
    ended: false,
    isSkipped,
    logEvents: [],
    previousRunId,
    reject,
    runId,
    runLabel,
    testFnWithReject,
    utcTimeInMs,
  });
};
