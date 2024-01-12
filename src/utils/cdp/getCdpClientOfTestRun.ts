import {assertValueIsDefined, assertValueIsFalse, assertValueIsString} from '../asserts';

import type {CdpClient, TestController} from '../../types/internal';

/**
 * Get CDP client of current test run.
 * @internal
 */
export const getCdpClientOfTestRun = (testController: TestController): CdpClient => {
  const {browserConnection} = testController.testRun;

  const browserId = browserConnection.id;

  assertValueIsString(browserId, 'browserId is string', {browserId});

  const browser = browserConnection.provider.plugin.openedBrowsers[browserId];

  assertValueIsDefined(browser, 'browser is defined', {browserId});

  const {browserClient} = browser;
  // eslint-disable-next-line no-underscore-dangle
  const clientAndInactiveFlag = browserClient._clients[browserClient._clientKey];

  assertValueIsDefined(clientAndInactiveFlag, 'clientAndInactiveFlag is defined', {browserId});

  const {client, inactive} = clientAndInactiveFlag;

  assertValueIsFalse(inactive, 'CDP client is active', {browserId});

  return client;
};
