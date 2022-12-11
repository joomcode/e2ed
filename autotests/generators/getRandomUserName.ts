import {getRandomId} from 'e2ed/generators';

/**
 * Get random user name.
 */
export const getRandomUserName = (): string => {
  const randomId = getRandomId();

  return `User ${randomId}`;
};
