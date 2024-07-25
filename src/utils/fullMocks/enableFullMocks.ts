// eslint-disable-next-line import/no-internal-modules
import {mockApiRoute} from '../../actions/mock';
import {LogEventType} from '../../constants/internal';
import {setFullMocksState} from '../../context/fullMocks';
import {getOnResponseCallbacks} from '../../context/onResponseCallbacks';

import {log} from '../log';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {FullMocksRoute} from './FullMocksRoute';
import {getResponseFromFullMocks} from './getResponseFromFullMocks';
import {getTestIdByTestFilePath} from './getTestIdByTestFilePath';
import {writeResponseToFullMocks} from './writeResponseToFullMocks';

import type {
  FullMocksConfig,
  FullMocksState,
  TestFilePath,
  TestFullMocks,
} from '../../types/internal';

/**
 * Enables full mocks for concrete test.
 * @internal
 */
export const enableFullMocks = async (
  fullMocksConfig: FullMocksConfig,
  shouldApplyMocks: boolean,
  testFilePath: TestFilePath,
): Promise<void> => {
  const fullMocksState: FullMocksState = {
    appliedMocks: undefined,
    testFullMocks: Object.create(null) as {},
    testId: await getTestIdByTestFilePath(testFilePath),
  };

  setFullMocksState(fullMocksState);

  let testFullMocks: TestFullMocks | undefined;

  if (shouldApplyMocks && !fullMocksConfig.writeOnly) {
    testFullMocks = await fullMocksConfig.readTestFullMocks(fullMocksState.testId);
  }

  if (testFullMocks !== undefined) {
    setReadonlyProperty(fullMocksState, 'appliedMocks', Object.create(null) as {});
    setReadonlyProperty(fullMocksState, 'testFullMocks', testFullMocks);

    log(
      'Full mocks have been read and enabled',
      {
        requestKinds: Object.fromEntries(
          Object.entries(testFullMocks).map(([key, value]) => [key, value.length]),
        ),
      },
      LogEventType.InternalUtil,
    );

    await mockApiRoute(FullMocksRoute, getResponseFromFullMocks, {skipLogs: true});
  } else {
    const onResponseCallbacks = getOnResponseCallbacks();

    onResponseCallbacks.push(writeResponseToFullMocks);
  }
};
