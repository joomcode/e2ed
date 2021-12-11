import {getRandomId} from 'e2ed/utils';

/**
 * Get random user name.
 */
export const getRandomUserName = (): string => {
  const randomId = getRandomId();

  return `User ${randomId}`;
};
