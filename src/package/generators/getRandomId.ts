import {randomUUID} from 'node:crypto';

/**
 * Get random id string like "2021-04-21T20:24:19.937Z-30def025-8cb7-4f1e-b38d-2ad76a3b4815".
 */
export const getRandomId = <T extends string = string>(): T =>
  `${new Date().toISOString()}-${randomUUID()}` as T;
