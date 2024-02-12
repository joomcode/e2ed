import {setCdpClient} from '../../context/cdpClient';

import {getCdpClientOfTestRun} from '../cdp';
import {getFullPackConfig} from '../config';
import {setDisconnectedHandler} from '../disconnectedBrowsers';

import type {TestController} from '../../types/internal';

/**
 * Processes `TestController` object of test before test run.
 * @internal
 */
export const processTestController = (testController: TestController): void => {
  if (getFullPackConfig().enableChromeDevToolsProtocol) {
    const cdpClient = getCdpClientOfTestRun(testController);

    setCdpClient(cdpClient);
  }

  setDisconnectedHandler(testController.testRun.browserConnection);
};
