import {INVALID_JSON_MESSAGE_LENGTH} from './constants';
import {mergeErrors} from './mergeErrors';
import {parseJsonData} from './parseJsonData';
import {readJsonData} from './readJsonData';
import {readJsonDataFromTruncatedJson} from './readJsonDataFromTruncatedJson';

import type {HtmlReportJsonDataWithError} from '../../../types/internal';

const endOfReport = '</script></body></html>';
const truncatedAfterError = 'HTML report is truncated after <script> tag with JSON data';

/**
 * Reads JSON data from the end of HTML report.
 * @internal
 */
export const readJsonDataFromEnd = (source: string): HtmlReportJsonDataWithError => {
  // every complete HTML report ends with `</script></body></html>`, so any other end means truncation
  if (source.endsWith(endOfReport)) {
    const {error, jsonData, tail} = readJsonData(source.slice(0, -endOfReport.length));

    if (tail !== '') {
      const cannotParseError = [
        'Cannot parse JSON data in the last <script> tag of complete HTML report: ',
        tail.slice(0, INVALID_JSON_MESSAGE_LENGTH),
      ].join('');

      return {error: mergeErrors([error, cannotParseError]), jsonData};
    }

    return {error, jsonData};
  }

  const {error, jsonData, tail} = readJsonData(source, true);

  const tagIndex = tail.indexOf('<');

  if (tagIndex !== -1) {
    const dataOrError = parseJsonData(tail.slice(0, tagIndex));

    if (typeof dataOrError !== 'string') {
      return {
        error: mergeErrors([error, truncatedAfterError]),
        jsonData: [...jsonData, dataOrError],
      };
    }

    return {error: mergeErrors([error, dataOrError, truncatedAfterError]), jsonData};
  }

  const dataOrError = parseJsonData(tail);

  if (typeof dataOrError !== 'string') {
    return {error: mergeErrors([error, truncatedAfterError]), jsonData: [...jsonData, dataOrError]};
  }

  const {error: lastError, jsonData: lastData} = readJsonDataFromTruncatedJson(tail);

  return {error: mergeErrors([error, lastError]), jsonData: [...jsonData, ...lastData]};
};
