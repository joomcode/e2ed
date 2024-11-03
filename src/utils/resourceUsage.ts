import {availableParallelism, cpus, freemem} from 'node:os';

import {assertValueIsDefined, assertValueIsTrue, assertValueIsUndefined} from './asserts';
import {generalLog} from './generalLog';
import {isUiMode} from './uiMode';

const Mb = 1024 * 1024;
const availableCpuCount = availableParallelism();

let previousCores = cpus();
let previousCpuUsage = process.cpuUsage();
let previousTimeInMs = Date.now();
let timeoutObject: NodeJS.Timeout;

const logResourceUsage = (): void => {
  const cores = cpus();
  const cpuUsage = process.cpuUsage();
  const timeInMs = Date.now();
  const intervalInMs = timeInMs - previousTimeInMs;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const divisor = 10 * availableCpuCount * intervalInMs;

  const cpu = (
    (cpuUsage.user + cpuUsage.system - previousCpuUsage.user - previousCpuUsage.system) /
    divisor
  ).toFixed(2);
  const freeMemoryInMb = (freemem() / Mb).toFixed();
  const memory = (process.memoryUsage.rss() / Mb).toFixed();

  assertValueIsTrue(
    cores.length === previousCores.length,
    'the number of processor cores has not changed',
  );

  const coresCpu: string[] = [];

  for (let index = 0; index < cores.length; index += 1) {
    const core = cores[index];
    const previousCore = previousCores[index];

    assertValueIsDefined(core, 'core is defined');
    assertValueIsDefined(previousCore, 'previousCore is defined');

    const coreCpu = (
      (100 * // eslint-disable-line @typescript-eslint/no-magic-numbers
        (core.times.user + core.times.sys - previousCore.times.user - previousCore.times.sys)) /
      intervalInMs
    ).toFixed();

    coresCpu.push(coreCpu);
  }

  previousCores = cores;
  previousCpuUsage = cpuUsage;
  previousTimeInMs = timeInMs;

  generalLog(`Usage: cpu=${cpu}%, memory=${memory}Mb (${freeMemoryInMb}Mb free)`, {
    'cores(%)': coresCpu.join(' '),
  });
};

/**
 * Starts reading and logging resource usage with specified interval (once).
 * @internal
 */
export const startResourceUsageReading = (resourceUsageReadingInternal: number): void => {
  assertValueIsUndefined(timeoutObject, 'timeoutObject in not defined', {
    resourceUsageReadingInternal,
  });

  if (isUiMode) {
    return;
  }

  timeoutObject = setInterval(logResourceUsage, resourceUsageReadingInternal);

  timeoutObject.unref();
};
