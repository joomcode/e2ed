import {randomUUID} from 'node:crypto';

/**
 * Get random id string (request_id) like "2021-04-21T20:24:19.937Z-77xdih8bw7".
 */
export const getRandomId = <T extends string = string>(): T =>
  `${new Date().toISOString()}-${randomUUID()}` as T;
