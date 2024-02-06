import {availableParallelism, cpus, freemem} from 'node:os';

import {assertValueIsDefined, assertValueIsTrue, assertValueIsUndefined} from './asserts';
import {generalLog} from './generalLog';

const Mb = 1024 * 1024;
const numberOfAvailableCpus = availableParallelism();

let previousCores = cpus();
let previousCpuUsage = process.cpuUsage();
let previousTimeInMs = Date.now();
let timeoutInterval: NodeJS.Timeout;

const logResourceUsage = (): void => {
  const cores = cpus();
  const cpuUsage = process.cpuUsage();
  const timeInMs = Date.now();
  const intervalInMs = timeInMs - previousTimeInMs;

  const divisor = 10 * numberOfAvailableCpus * intervalInMs;

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
      (core.times.user + core.times.sys - previousCore.times.user - previousCore.times.sys) /
      (10 * intervalInMs)
    ).toFixed(2);

    coresCpu.push(coreCpu === '0.00' ? '0' : coreCpu);
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
  assertValueIsUndefined(timeoutInterval, 'timeoutInterval in not defined', {
    resourceUsageReadingInternal,
  });

  timeoutInterval = setInterval(logResourceUsage, resourceUsageReadingInternal);

  timeoutInterval.unref();

  logResourceUsage();
};
