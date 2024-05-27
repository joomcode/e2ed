import {readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

import {BAD_REQUEST_STATUS_CODE, LogEventType, READ_FILE_OPTIONS} from 'e2ed/constants';

import type {FullMocks} from 'autotests/configurator';
import type {FilePathFromRoot, FullMocksTestId, RequestKind, TestFullMocks} from 'e2ed/types';
import type {log as logType} from 'e2ed/utils';

const fullMocksStoragePath = join('autotests', 'fixtures', 'fullMocks');

const getTestFullMocksPath = (testId: FullMocksTestId): FilePathFromRoot =>
  join(fullMocksStoragePath, `${testId}.json`) as FilePathFromRoot;

let log: typeof logType | undefined;

export const fullMocks: FullMocks = {
  filterTests: ({options: {meta}}) => meta.testId === '18',
  getRequestKind: (method, {pathname}) => pathname as RequestKind,
  getResponseFromFullMocks: ({requestKind, responseWithRequest}) => {
    const response = responseWithRequest ?? {statusCode: BAD_REQUEST_STATUS_CODE};

    if (log === undefined) {
      // eslint-disable-next-line
      log = (require('e2ed/utils') as typeof import('e2ed/utils')).log;
    }

    log(`Apply mock for request "${requestKind}"`, {response}, LogEventType.Util);

    return response;
  },
  getResponseToWriteToFullMocks: (requestKind, responseWithRequest) => responseWithRequest,
  readTestFullMocks: async (testId) => {
    const testFullMocksJson = await readFile(getTestFullMocksPath(testId), READ_FILE_OPTIONS).catch(
      () => undefined,
    );

    if (testFullMocksJson === undefined) {
      return undefined;
    }

    return JSON.parse(testFullMocksJson) as TestFullMocks;
  },
  writeOnly: false,
  writeTestFullMocks: async (testId, testFullMocks) => {
    const testFullMocksJson = JSON.stringify(testFullMocks);

    await writeFile(getTestFullMocksPath(testId), testFullMocksJson);
  },
};
