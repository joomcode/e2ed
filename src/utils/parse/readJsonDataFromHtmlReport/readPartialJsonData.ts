/* eslint-disable prefer-template */

import {readJsonData} from './readJsonData';

import type {HtmlReportJsonData} from '../../../types/internal';

type Return = Readonly<{
  jsonData: readonly HtmlReportJsonData[];
  tail: string;
}>;

/**
 * Reads JSON data from partial JSON source.
 * @internal
 */
export const readPartialJsonData = (
  partialJsonSource: string,
  isLastPart: boolean = false,
): Return => {
  if (isLastPart) {
    const index = partialJsonSource.lastIndexOf('</script>');

    if (index === -1) {
      throw new Error('Cannot find end of <script> tag in the end of HTML report');
    }

    const data = readJsonData(partialJsonSource.slice(0, index));

    if (data.tail !== '') {
      throw new Error('Cannot parse end of JSON data in the end of HTML report');
    }

    return data;
  }

  const index = partialJsonSource.lastIndexOf('"},{"mainParams":"');

  if (index === -1) {
    return {jsonData: [], tail: partialJsonSource};
  }

  const {jsonData, tail} = readJsonData(partialJsonSource.slice(0, index + 2) + ']');

  return {
    jsonData,
    tail:
      tail === ''
        ? '[' + partialJsonSource.slice(index + 2 + 1)
        : tail.slice(0, -1) + partialJsonSource.slice(index + 2),
  };
};
