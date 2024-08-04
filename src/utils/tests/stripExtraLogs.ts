import {sep} from 'node:path';

/**
 * Strip extra Playwright logs.
 * @internal
 */
export const stripExtraLogs = (text: string): string => {
  const lines = text.split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (line?.includes(`${sep}node_modules${sep}e2ed${sep}test.js:`)) {
      const startIndex = line.indexOf('›');
      const endIndex = line.lastIndexOf('›');

      if (startIndex >= 0) {
        lines[index] = line.slice(0, startIndex) + line.slice(endIndex);
      }
    }
  }

  return lines.join('\n');
};
