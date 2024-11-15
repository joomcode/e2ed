import {e2edEnvironment, isDebug} from '../../constants/internal';

import {assertNumberIsPositiveInteger} from '../asserts';

import type {ForkOptions} from 'node:child_process';

/**
 * Get fork options for tests subprocess.
 * @internal
 */
export const getTestsSubprocessForkOptions = (): ForkOptions | undefined => {
  if (!isDebug) {
    return undefined;
  }

  const execArgvWithoutInspect = process.execArgv.filter((arg) => !arg.startsWith('--inspect'));
  const port = Number(e2edEnvironment.E2ED_DEBUG) + 1;

  assertNumberIsPositiveInteger(port, 'port is positive integer', {e2edEnvironment});

  return {execArgv: [...execArgvWithoutInspect, `--inspect-brk=0.0.0.0:${port}`]};
};
