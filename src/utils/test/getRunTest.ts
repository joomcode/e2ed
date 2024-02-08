import {setCdpClient} from '../../context/cdpClient';
import {createRunId} from '../../generators/internal';

import {assertValueIsDefined} from '../asserts';
import {getCdpClientOfTestRun} from '../cdp';
import {getFullPackConfig} from '../config';
import {addTestToNotIncludedInPackTests} from '../notIncludedInPackTests';

import {afterErrorInTest} from './afterErrorInTest';
import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {getIsTestIncludedInPack} from './getIsTestIncludedInPack';
import {getTestStaticOptions} from './getTestStaticOptions';
import {runTestFn} from './runTestFn';

import type {RunId, Test, TestController, TestStaticOptions} from '../../types/internal';

type RunTest = (testController: TestController) => Promise<void>;

/**
 * Get complete run test function by the complete test options.
 * @internal
 */
export const getRunTest = (test: Test): RunTest => {
  let previousRunId: RunId | undefined;

  return async (testController: TestController): Promise<void> => {
    const runId = createRunId();

    let hasRunError = false;
    let isTestIncludedInPack = false;
    let testStaticOptions: TestStaticOptions | undefined;
    let unknownRunError: unknown;

    try {
      testStaticOptions = getTestStaticOptions(test, testController);

      isTestIncludedInPack = getIsTestIncludedInPack(testStaticOptions);

      if (!isTestIncludedInPack) {
        await addTestToNotIncludedInPackTests(testStaticOptions.filePath);

        return;
      }

      if (getFullPackConfig().enableChromeDevToolsProtocol) {
        const cdpClient = getCdpClientOfTestRun(testController);

        setCdpClient(cdpClient);
      }

      beforeTest({previousRunId, runId, testFn: test.testFn, testStaticOptions});

      previousRunId = runId;

      await runTestFn(runId, testController);
    } catch (error) {
      hasRunError = true;
      unknownRunError = error;

      assertValueIsDefined(testStaticOptions, 'testStaticOptions is defined', {error, runId});

      await afterErrorInTest(testStaticOptions);

      throw error;
    } finally {
      if (isTestIncludedInPack) {
        await afterTest({hasRunError, runId, unknownRunError});
      }

      setTimeout(() => void testController.testRun.emit('done'), 300);
    }
  };
};
