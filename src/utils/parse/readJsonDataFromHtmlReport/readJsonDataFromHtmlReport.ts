import {getJsonDataBeginning} from './getJsonDataBeginning';
import {readPartialJsonData} from './readPartialJsonData';

import type {HtmlReportJsonData} from '../../../types/internal';

type HtmlReportSource = AsyncIterable<string> | Promise<string> | string;

/**
 * Reads JSON data from HTML report.
 */
// eslint-disable-next-line complexity, max-statements
export async function* readJsonDataFromHtmlReport(
  source: HtmlReportSource,
): AsyncGenerator<HtmlReportJsonData> {
  if (typeof source === 'string' || 'then' in source) {
    const beginning = getJsonDataBeginning(typeof source === 'string' ? source : await source);

    if (beginning === undefined) {
      throw new Error('Cannot find JSON data in HTML report');
    }

    const {jsonData} = readPartialJsonData(beginning, true);

    for (const part of jsonData) {
      yield part;
    }

    return;
  }

  let jsonData: readonly HtmlReportJsonData[] | undefined;
  let jsonPart: string | undefined;
  let startPart = '';
  let tail: string | undefined;

  for await (const sourcePart of source) {
    if (tail === undefined) {
      startPart += sourcePart;

      tail = getJsonDataBeginning(startPart);

      if (tail === undefined) {
        continue;
      }

      jsonPart = tail;
    } else {
      jsonPart = tail + sourcePart;
    }

    ({jsonData, tail} = readPartialJsonData(jsonPart));

    for (const part of jsonData) {
      yield part;
    }
  }

  if (tail === undefined) {
    throw new Error('Source iterable is empty');
  }

  ({jsonData} = readPartialJsonData(tail, true));

  for (const part of jsonData) {
    yield part;
  }
}
