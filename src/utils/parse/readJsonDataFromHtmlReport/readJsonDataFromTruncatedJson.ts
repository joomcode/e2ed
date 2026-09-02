import {END_OF_RUN, SEPARATOR} from './constants';
import {parseJsonData} from './parseJsonData';

import type {HtmlReportJsonDataWithError} from '../../../types/internal';

const error = 'HTML report is truncated inside test runs in <script> tag with JSON data';

/**
 * Reads JSON data from truncated JSON chunk of HTML report.
 * @internal
 */
export const readJsonDataFromTruncatedJson = (json: string): HtmlReportJsonDataWithError => {
  if (!json.startsWith('[')) {
    return {error: 'HTML report is truncated inside <script> tag with JSON data', jsonData: []};
  }

  const endOfRunIndex = json.lastIndexOf(END_OF_RUN);

  if (endOfRunIndex === -1) {
    return {error, jsonData: []};
  }

  let dataOrError = parseJsonData(`${json.slice(0, endOfRunIndex)}${END_OF_RUN}]`);

  if (typeof dataOrError !== 'string') {
    return {error, jsonData: [dataOrError]};
  }

  const index = json.lastIndexOf(SEPARATOR);

  if (index !== -1) {
    dataOrError = parseJsonData(`${json.slice(0, index)}${END_OF_RUN}]`);

    if (typeof dataOrError !== 'string') {
      return {error, jsonData: [dataOrError]};
    }
  }

  return {error, jsonData: []};
};
