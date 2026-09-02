import {assertValueIsDefined} from '../assertValueIsDefined';

import {SCRIPT_TAG} from './constants';
import {mergeErrors} from './mergeErrors';
import {parseJsonData} from './parseJsonData';

import type {HtmlReportJsonData, HtmlReportJsonDataWithError} from '../../../types/internal';

type Return = HtmlReportJsonDataWithError & Readonly<{tail: string}>;

const separator = `</script>${SCRIPT_TAG}`;

/**
 * Reads JSON data from complete JSON source.
 * @internal
 */
export const readJsonData = (jsonSource: string, doNotParseLast = false): Return => {
  const parts = jsonSource.split(separator);

  const lastPart = parts.pop();

  assertValueIsDefined(lastPart, 'Cannot parse JSON data from HTML report');

  const errors: string[] = [];
  const jsonData: HtmlReportJsonData[] = [];

  for (const part of parts) {
    const dataOrError = parseJsonData(part);

    if (typeof dataOrError === 'string') {
      errors.push(dataOrError);
    } else {
      jsonData.push(dataOrError);
    }
  }

  const error = mergeErrors(errors);

  try {
    if (doNotParseLast) {
      return {error, jsonData, tail: lastPart};
    }

    jsonData.push(JSON.parse(lastPart) as HtmlReportJsonData);
  } catch {
    return {error, jsonData, tail: lastPart};
  }

  return {error, jsonData, tail: ''};
};
