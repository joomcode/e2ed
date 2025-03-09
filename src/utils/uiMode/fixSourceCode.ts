// eslint-disable-next-line import/no-unused-modules
import {sep} from 'node:path';

import {setReadonlyProperty} from '../object';

import {isUiMode} from './uiMode';

import type {PropertyDescriptor} from '../../types/internal';

if (isUiMode) {
  const e2edPathPart = [sep, 'node_modules', sep, 'e2ed', sep].join('');

  const OriginalError = globalThis.Error;
  const originalErrorString = String(OriginalError);

  // eslint-disable-next-line no-restricted-syntax
  globalThis.Error = function Error(message, options) {
    const error = new OriginalError(message, options);

    const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(
      error,
      'stack',
    );

    if (descriptor && 'value' in descriptor) {
      const {value} = descriptor;

      if (typeof value === 'string') {
        const parts = value.split('\n');

        const filteredParts = parts.filter((line) => {
          if (line.includes(e2edPathPart)) {
            return false;
          }

          return true;
        });

        const newValue = filteredParts.join('\n');

        error.stack = newValue;
      } else if (Array.isArray(value)) {
        const filtered = value.filter((stackFrame: unknown) => {
          if (
            stackFrame !== null &&
            typeof stackFrame === 'object' &&
            'getScriptNameOrSourceURL' in stackFrame &&
            typeof stackFrame.getScriptNameOrSourceURL === 'function'
          ) {
            const sourceUrl: unknown = stackFrame.getScriptNameOrSourceURL();

            if (typeof sourceUrl === 'string' && sourceUrl.includes(e2edPathPart)) {
              return false;
            }
          }

          return true;
        });

        error.stack = filtered as unknown as string;
      }
    }

    return error;
  } as typeof OriginalError;

  setReadonlyProperty(Error, 'prototype', OriginalError.prototype);

  Object.assign(globalThis.Error.prototype, {
    browserLogMessage() {
      return '';
    },
    constructor: Error,
    setMessage(this: {message: string}, message: string) {
      this.message = message;
    },
  });

  // eslint-disable-next-line @typescript-eslint/unbound-method
  Error.captureStackTrace = OriginalError.captureStackTrace;
  Error.prepareStackTrace = OriginalError.prepareStackTrace;
  Error.stackTraceLimit = OriginalError.stackTraceLimit;
  Error.toString = () => originalErrorString;
}
