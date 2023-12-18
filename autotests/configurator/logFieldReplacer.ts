import {getShallowCopyOfObjectForLogs, getStringTrimmedToMaxLength} from 'e2ed/configurator';

import type {FieldReplacer} from 'e2ed/types';

/**
 * Field replacer for log payload.
 */
export const logFieldReplacer: FieldReplacer = (path, value) => {
  if (typeof value === 'string') {
    return getStringTrimmedToMaxLength(value, 500);
  }

  const key = path.at(-1);

  if (key === 'responseBody' && value && typeof value === 'object') {
    const {payload, ...responseBodyWithoutPayload} = value as {payload?: unknown};

    if (payload && typeof payload === 'object') {
      const copyOfPayload = getShallowCopyOfObjectForLogs(payload);
      const copyOfResponseBody = getShallowCopyOfObjectForLogs(responseBodyWithoutPayload) as {
        payload?: unknown;
      };

      copyOfResponseBody.payload = copyOfPayload;

      return copyOfResponseBody;
    }

    return getShallowCopyOfObjectForLogs(value);
  }

  return value;
};
