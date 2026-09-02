import {assertValueIsDefined} from '../assertValueIsDefined';

import {getJsonDataBeginning} from './getJsonDataBeginning';
import {readJsonDataFromEnd} from './readJsonDataFromEnd';
import {throwIfAny} from './throwIfAny';

import type {HtmlReportJsonData} from '../../../types/internal';

/**
 * Reads JSON data from string of HTML report.
 * @internal
 */
export async function* readJsonDataFromString(
  source: Promise<Uint8Array | string> | Uint8Array | string,
): AsyncGenerator<HtmlReportJsonData> {
  const awaitedSource =
    typeof source === 'string' || source instanceof Uint8Array ? source : await source;
  const sourceString =
    typeof awaitedSource === 'string' ? awaitedSource : new TextDecoder().decode(awaitedSource);

  const beginning = getJsonDataBeginning(sourceString);

  assertValueIsDefined(beginning, 'Cannot find JSON data in HTML report');

  const {error, jsonData} = readJsonDataFromEnd(beginning);

  for (const part of jsonData) {
    yield part;
  }

  throwIfAny([error]);
}
