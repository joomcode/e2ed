import {assertValueIsDefined} from '../assertValueIsDefined';

import {END_OF_RUN, PRE_SEPARATOR, SEPARATOR} from './constants';
import {readJsonData} from './readJsonData';

import type {HtmlReportJsonDataWithError} from '../../../types/internal';

type Return = Omit<HtmlReportJsonDataWithError, 'error'> &
  Readonly<{isTailValid: boolean; tail: string[]}>;

/**
 * Reads JSON data from partial JSON source.
 * @internal
 */
export const readPartialJsonData = (
  partialJsonSource: string[],
  isTailValid: boolean,
  errors: (string | undefined)[],
): Return => {
  const lastPart = partialJsonSource.pop();

  assertValueIsDefined(lastPart, 'Cannot find end part of HTML report');

  if (!isTailValid && !lastPart.includes('</script>')) {
    partialJsonSource.push(lastPart);

    return {isTailValid, jsonData: [], tail: partialJsonSource};
  }

  const index = lastPart.lastIndexOf(SEPARATOR);

  if (index === -1) {
    partialJsonSource.push(lastPart);

    return {isTailValid: true, jsonData: [], tail: partialJsonSource};
  }

  const {error, jsonData, tail} = readJsonData(
    [...partialJsonSource, lastPart.slice(0, index), `${END_OF_RUN}]`].join(''),
  );

  if (error !== undefined) {
    errors.push(error);
  }

  return {
    isTailValid: tail === '' || lastPart.includes('</script>', index),
    jsonData,
    tail:
      tail === ''
        ? ['[', lastPart.slice(index + PRE_SEPARATOR.length)]
        : [tail.slice(0, -1), lastPart.slice(index + END_OF_RUN.length)],
  };
};
