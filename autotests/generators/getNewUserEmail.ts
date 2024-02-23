import type {Email} from 'autotests/types';

const createdEmailsCounts: Record<string, number> = {};
const maxCountLength = 4;

/**
 * Returns new unique email like 'test_2021-05-21T18-07-00.500Z_0001@example.com'.
 */
export const getNewUserEmail = (): Email => {
  const timeHash = new Date().toISOString().replace(/:/g, '-');

  const currentCount = createdEmailsCounts[timeHash] ?? 0;
  const newCount = currentCount + 1;

  createdEmailsCounts[timeHash] = newCount;

  const paddedNewCount = String(newCount).padStart(maxCountLength, '0');

  return `test_${timeHash}_${paddedNewCount}@example.com` as Email;
};
