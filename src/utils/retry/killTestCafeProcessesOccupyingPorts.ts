import {execFileSync} from 'node:child_process';

import {EXEC_FILE_OPTIONS} from '../../constants/internal';

import {generalLog} from '../generalLog';
import {getFullPackConfig} from '../getFullPackConfig';

const nodeProcessPidRegexp = /\b(?<pid>\d+)\/node\b/;

/**
 * Kill TestCafe node processes occupying the TestCafe ports (from config), if any.
 * @internal
 */
export const killTestCafeProcessesOccupyingPorts = (): void => {
  const {port1, port2} = getFullPackConfig();

  const killedPids: string[] = [];
  const processes = execFileSync('netstat', ['-tulpn'], EXEC_FILE_OPTIONS).split('\n');
  const processesOccupyingPorts = processes.filter(
    (process) =>
      process.includes('LISTEN') &&
      (process.includes(`:${port1}`) || process.includes(`:${port2}`)),
  );

  for (const process of processesOccupyingPorts) {
    const match = process.match(nodeProcessPidRegexp) as {groups: {pid: string}} | null;

    if (!match) {
      continue;
    }

    try {
      const {pid} = match.groups;

      if (killedPids.includes(pid)) {
        continue;
      }

      execFileSync('kill', ['-9', pid], EXEC_FILE_OPTIONS);

      killedPids.push(pid);

      generalLog(`Kill the process with PID=${pid}`, {process});
    } catch (error) {
      generalLog('Caught an error when kill the process with', {error, process});
    }
  }
};
