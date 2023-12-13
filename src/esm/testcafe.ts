/**
 * @file This file must be a syntactically valid ESM module.
 */

import {createRequire} from 'node:module';

// @ts-expect-error: import.meta is not allowed with "module": "CommonJS"
const require = createRequire(import.meta.url);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const {
  createTestCafe,
  fixture,
  RequestHook,
  RequestLogger,
  RequestMock,
  Selector,
  test,
  // eslint-disable-next-line import/no-commonjs
} = require('../testcafe');
