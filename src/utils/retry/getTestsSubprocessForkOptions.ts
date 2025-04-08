import {DEBUG_PORT} from '../../constants/internal';

import {assertNumberIsPositiveInteger} from '../asserts';

import type {ForkOptions} from 'node:child_process';

/**
 * Get fork options for tests subprocess.
 * @internal
 */
export const getTestsSubprocessForkOptions = (): ForkOptions | undefined => {
  if (DEBUG_PORT === undefined) {
    return undefined;
  }

  const execArgvWithoutInspect = process.execArgv.filter((arg) => !arg.startsWith('--inspect'));
  const port = DEBUG_PORT + 1;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  assertNumberIsPositiveInteger(port, 'port is positive integer', {DEBUG_PORT});

  return {execArgv: [...execArgvWithoutInspect, `--inspect-brk=0.0.0.0:${port}`]};
};
