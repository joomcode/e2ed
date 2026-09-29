import {assertValueIsDefined} from '../assertValueIsDefined';

import {SCRIPT_TAG} from './constants';
import {createGetChunk} from './createGetChunk';
import {getEdge} from './getEdge';
import {getJsonDataBeginning} from './getJsonDataBeginning';
import {readJsonDataFromEnd} from './readJsonDataFromEnd';
import {readPartialJsonData} from './readPartialJsonData';
import {throwIfAny} from './throwIfAny';

import type {HtmlReportJsonData} from '../../../types/internal';

type IterableSource =
  AsyncIterable<string> | AsyncIterable<Uint8Array> | Iterable<string> | Iterable<Uint8Array>;

/**
 * Reads JSON data from iterable with chunks of HTML report.
 * @internal
 */
export async function* readJsonDataFromIterable(
  source: IterableSource,
): AsyncGenerator<HtmlReportJsonData> {
  let edge: string = '';
  const errors: (string | undefined)[] = [];
  let getChunk: ReturnType<typeof createGetChunk> | undefined;
  let isTailValid: boolean = true;
  let jsonData: readonly HtmlReportJsonData[] | undefined;
  let tail: string[] | undefined;

  for await (const sourceChunk of source) {
    const chunk = (getChunk ??= createGetChunk(typeof sourceChunk === 'string'))(sourceChunk);

    if (tail === undefined) {
      const tailString = getJsonDataBeginning(chunk, edge);

      if (tailString === undefined) {
        edge = getEdge(edge, chunk, SCRIPT_TAG.length - 1);

        continue;
      }

      tail = [tailString];
    } else {
      tail.push(chunk);
    }

    ({isTailValid, jsonData, tail} = readPartialJsonData(tail, isTailValid, errors));

    for (const part of jsonData) {
      yield part;
    }
  }

  assertValueIsDefined(tail, 'Source iterable contains no JSON data');

  const {error, jsonData: endJsonData} = readJsonDataFromEnd(tail.join(''));

  for (const part of endJsonData) {
    yield part;
  }

  throwIfAny([...errors, error]);
}
