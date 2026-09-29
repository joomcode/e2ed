import {readJsonDataFromIterable} from './readJsonDataFromIterable';
import {readJsonDataFromString} from './readJsonDataFromString';

import type {HtmlReportJsonData} from '../../../types/internal';

type HtmlReportSource =
  | AsyncIterable<string>
  | AsyncIterable<Uint8Array>
  | Iterable<string>
  | Iterable<Uint8Array>
  | Promise<Uint8Array | string>
  | Uint8Array
  | string;

/**
 * Reads all JSON data embedded in HTML report, and returns it by parts with async generator.
 * If the report is truncated, yields as much data as possible, and then throws an error.
 */
export const readJsonDataFromHtmlReport = (
  source: HtmlReportSource,
): AsyncGenerator<HtmlReportJsonData> => {
  if (typeof source === 'string' || source instanceof Uint8Array || 'then' in source) {
    return readJsonDataFromString(source);
  }

  return readJsonDataFromIterable(source);
};
