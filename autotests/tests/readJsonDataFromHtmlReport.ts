/* eslint-disable @typescript-eslint/no-magic-numbers, max-lines */

import {test} from 'autotests';
import {expect} from 'e2ed';
import {assertValueIsDefined} from 'e2ed/utils';
import {readJsonDataFromHtmlReport} from 'e2ed/utils/parse';

type Block = Readonly<Record<string, unknown>> | readonly Readonly<Record<string, unknown>>[];

type ChunkSize = number | ((index: number) => number);

type CorruptionCase = Readonly<{
  blockIndex: number;
  isTruncated: boolean;
  relativePosition: number;
}>;

type CorruptionExpectation = Readonly<{
  errorPrefix: string;
  intactNames: readonly string[];
  isTruncated: boolean;
  situation: string;
  sourceHtml: string;
  stringError: string;
}>;

type Item = Readonly<{end: number; json: string; name: string}>;

type NamedSource = Readonly<{name: string; source: () => Source}>;

type ReadResult = Readonly<{
  error: string | undefined;
  jsons: readonly string[];
  names: readonly string[];
  yields: number;
}>;

type Report = Readonly<{
  blocks: readonly ReportBlock[];
  html: string;
  items: readonly Item[];
}>;

type ReportBlock = Readonly<{contentEnd: number; contentStart: number; isArray: boolean}>;

type Source = Parameters<typeof readJsonDataFromHtmlReport>[0];

const scriptTag = '<script class="e2edJsonReportData" type="application/json">';
const separator = '"},{"mainParams":"';

const htmlPrefix = [
  '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Отчёт e2ed 🚀</title>',
  '<script>const text = "</div>";</script></head>',
  '<body><main><h1>Отчёт</h1><button>Тест «кнопка»</button></main>',
].join('');

const parseError = 'Cannot parse JSON data in <script> tag of HTML report: ';
const parseLastError = 'Cannot parse JSON data in the last <script> tag of complete HTML report: ';
const truncatedAfter = 'HTML report is truncated after <script> tag with JSON data';
const truncatedInside = 'HTML report is truncated inside <script> tag with JSON data';
const truncatedInsideRuns =
  'HTML report is truncated inside test runs in <script> tag with JSON data';

const sanitizeJson = (json: string): string => json.replace(/</g, '\\u003c');

const getItemName = (item: unknown): string => {
  if (item !== null && typeof item === 'object' && 'mainParams' in item) {
    return String(item.mainParams);
  }

  return 'apiStatistics';
};

/* eslint-disable sort-keys */

/**
 * Creates test run with the same keys order as in HTML report
 * (`mainParams` is the first key and `status` is the last one, as `readJsonDataFromHtmlReport` expects).
 */
const createTestRun = (
  index: number,
  logsCount: number,
  withFakeSeparator = false,
): Readonly<Record<string, unknown>> => ({
  mainParams: `run ${index} «тест» 🚀`,
  runHash: `hash-${index}`,
  endTimeInMs: 1_790_000_001_000 + index,
  filePath: `autotests/tests/test${index}.ts`,
  logEvents: Array.from({length: logsCount}, (_, logIndex) => ({
    message: `Лог ${logIndex}: </script><script>alert(1)</script> "},{"mainParams":" 😀`,
    payload: {
      list: withFakeSeparator ? [{a: 'b'}, {mainParams: 'fake'}] : [{a: 'b'}],
      nested: {value: 'ends with quote'},
    },
    time: logIndex,
    type: 0,
  })),
  name: `Test ${index} ✅`,
  options: {meta: {testId: String(index)}},
  outputDirectoryName: String(index),
  retryIndex: 1,
  runId: `run-id-${index}`,
  runLabel: 'r:1,c:1',
  startTimeInMs: 1_790_000_000_000 + index,
  status: index % 3 === 0 ? 'failed' : 'passed',
});

/* eslint-enable sort-keys */

const createClientData = (): Readonly<Record<string, unknown>> => ({
  apiStatistics: {
    pages: {'Main «страница»': {'/': {count: 2, duration: 30}}},
    requests: {'https://example.com/<api>': {'200': {count: 3, duration: 40, size: 50}}},
    resources: {'https://example.com/app.js': {'200': {count: 1, duration: 5, size: 60}}},
  },
});

/**
 * Creates HTML report in the same format as `JsonData` component renders it.
 */
const createReport = (blocks: readonly Block[]): Report => {
  const items: Item[] = [];
  const reportBlocks: ReportBlock[] = [];
  let html = htmlPrefix;

  for (const block of blocks) {
    html += scriptTag;

    const contentStart = html.length;
    const jsonItems = Array.isArray(block) ? block : [block];

    if (Array.isArray(block)) {
      html += '[';
    }

    for (const [index, jsonItem] of jsonItems.entries()) {
      const json = JSON.stringify(jsonItem);

      html += `${index === 0 ? '' : ','}${sanitizeJson(json)}`;

      items.push({end: html.length, json, name: getItemName(jsonItem)});
    }

    if (Array.isArray(block)) {
      html += ']';
    }

    reportBlocks.push({contentEnd: html.length, contentStart, isArray: Array.isArray(block)});

    html += '</script>';
  }

  html += '</body></html>';

  return {blocks: reportBlocks, html, items};
};

const createRandom = (seed: number): (() => number) => {
  let state = seed;

  return () => {
    state = (state * 1_103_515_245 + 12_345) % 2_147_483_648;

    return state / 2_147_483_648;
  };
};

function* toChunks<Chunk extends Uint8Array | string>(
  source: Chunk,
  chunkSize: ChunkSize,
): Generator<Chunk> {
  let index = 0;

  for (let start = 0; start < source.length; index += 1) {
    const size = typeof chunkSize === 'number' ? chunkSize : chunkSize(index);

    yield source.slice(start, start + size) as Chunk;

    start += size;
  }
}

async function* toAsyncChunks<Chunk extends Uint8Array | string>(
  source: Chunk,
  chunkSize: ChunkSize,
): AsyncGenerator<Chunk> {
  for (const chunk of toChunks(source, chunkSize)) {
    yield await Promise.resolve(chunk);
  }
}

async function* toAsyncParts(parts: readonly string[]): AsyncGenerator<string> {
  for (const part of parts) {
    yield await Promise.resolve(part);
  }
}

const read = async (source: Source): Promise<ReadResult> => {
  const jsons: string[] = [];
  const names: string[] = [];
  let error: string | undefined;
  let yields = 0;

  try {
    for await (const jsonData of readJsonDataFromHtmlReport(source)) {
      yields += 1;

      for (const item of Array.isArray(jsonData) ? jsonData : [jsonData]) {
        jsons.push(JSON.stringify(item));
        names.push(getItemName(item));
      }
    }
  } catch (readError) {
    error = readError instanceof Error ? readError.message : String(readError);
  }

  return {error, jsons, names, yields};
};

const measure = async (action: () => Promise<unknown>): Promise<number> => {
  const startTime = Date.now();

  await action();

  return Date.now() - startTime;
};

const getFirstContentStart = (report: Report): number => report.blocks[0]?.contentStart ?? 0;

const isReadCompletely = (result: ReadResult, report: Report): boolean =>
  result.error === undefined &&
  result.names.join('\n') === report.items.map(({name}) => name).join('\n');

const getSourcesFailures = async (
  report: Report,
  sources: readonly NamedSource[],
): Promise<readonly string[]> => {
  const failures: string[] = [];

  for (const {name, source} of sources) {
    const result = await read(source());

    if (!isReadCompletely(result, report)) {
      failures.push(`${name}: ${result.error ?? `${result.names.length} items`}`);
    }
  }

  return failures;
};

const getTagSplitFailures = async (report: Report): Promise<readonly string[]> => {
  const {html} = report;
  const failures: string[] = [];
  const tagStart = getFirstContentStart(report) - scriptTag.length;

  for (let delta = 1; delta < scriptTag.length; delta += 1) {
    const twoParts = [html.slice(0, tagStart + delta), html.slice(tagStart + delta)];
    const threeParts = [
      html.slice(0, tagStart - 3),
      html.slice(tagStart - 3, tagStart + delta),
      html.slice(tagStart + delta),
    ];

    for (const parts of [twoParts, threeParts]) {
      if (!isReadCompletely(await read(toAsyncParts(parts)), report)) {
        failures.push(`split at ${delta} of tag into ${parts.length} parts`);
      }
    }
  }

  return failures;
};

const getSeparatorSplitFailures = async (report: Report): Promise<readonly string[]> => {
  const {html} = report;
  const failures: string[] = [];
  const separatorIndex = html.indexOf(separator, getFirstContentStart(report));

  for (let delta = 1; delta < separator.length; delta += 1) {
    const index = separatorIndex + delta;
    const result = await read(toAsyncParts([html.slice(0, index), html.slice(index)]));

    if (!isReadCompletely(result, report)) {
      failures.push(`split at ${delta} of separator`);
    }
  }

  return failures;
};

const getExpectedTruncationError = (report: Report, cut: number): string => {
  for (const {contentEnd, contentStart, isArray} of report.blocks) {
    if (cut === contentStart) {
      return truncatedInside;
    }

    if (cut > contentStart && cut < contentEnd) {
      return isArray ? truncatedInsideRuns : truncatedInside;
    }
  }

  return truncatedAfter;
};

const getTruncationPoints = (report: Report): readonly number[] => {
  const {blocks, html} = report;
  const firstContentStart = getFirstContentStart(report);
  const points = new Set<number>();
  const random = createRandom(7);

  for (const {contentEnd, contentStart} of blocks) {
    for (let delta = -3; delta <= 12; delta += 1) {
      points.add(contentStart + delta);
      points.add(contentEnd + delta);
    }
  }

  for (
    let index = html.indexOf(separator);
    index !== -1;
    index = html.indexOf(separator, index + 1)
  ) {
    for (let delta = 0; delta <= separator.length + 2; delta += 1) {
      points.add(index + delta);
    }
  }

  for (let index = 0; index < 100; index += 1) {
    points.add(firstContentStart + Math.floor(random() * (html.length - firstContentStart)));
  }

  return [...points]
    .filter((point) => point >= firstContentStart && point < html.length)
    .sort((a, b) => a - b);
};

const getTruncationFailures = async (
  report: Report,
  points: readonly number[],
): Promise<readonly string[]> => {
  const failures: string[] = [];

  for (const cut of points) {
    const truncatedHtml = report.html.slice(0, cut);
    const idealNames = report.items.filter(({end}) => end <= cut).map(({name}) => name);
    const expectedError = getExpectedTruncationError(report, cut);
    const sources: readonly NamedSource[] = [
      {name: 'string', source: () => truncatedHtml},
      {name: 'chunks of 4096', source: () => toAsyncChunks(truncatedHtml, 4096)},
      {name: 'chunks of 7', source: () => toAsyncChunks(truncatedHtml, 7)},
    ];

    for (const {name, source} of sources) {
      const result = await read(source());

      if (result.names.join('\n') !== idealNames.join('\n')) {
        failures.push(`cut ${cut} (${name}): ${result.names.length} items of ${idealNames.length}`);
      }

      if (result.error !== expectedError) {
        failures.push(
          `cut ${cut} (${name}): error "${result.error}" instead of "${expectedError}"`,
        );
      }
    }
  }

  return failures;
};

const corruptBlock = (report: Report, blockIndex: number, relativePosition: number): string => {
  const block = report.blocks[blockIndex];

  assertValueIsDefined(block, 'block is defined', {blockIndex});

  const {contentEnd, contentStart} = block;
  const separatorIndex = report.html.indexOf(
    separator,
    contentStart + Math.floor((contentEnd - contentStart) * relativePosition),
  );
  const position =
    separatorIndex === -1 || separatorIndex > contentEnd
      ? contentStart + 1
      : separatorIndex + '"},{'.length;

  return `${report.html.slice(0, position)}@${report.html.slice(position)}`;
};

const getCorruptionExpectation = (
  report: Report,
  {blockIndex, isTruncated, relativePosition}: CorruptionCase,
): CorruptionExpectation => {
  const block = report.blocks[blockIndex];
  const lastBlock = report.blocks.at(-1);

  assertValueIsDefined(block, 'block is defined', {blockIndex});
  assertValueIsDefined(lastBlock, 'lastBlock is defined');

  const corruptedHtml = corruptBlock(report, blockIndex, relativePosition);
  const brokenContent = corruptedHtml.slice(block.contentStart, block.contentEnd + 1);
  const errorPrefix = block === lastBlock && !isTruncated ? parseLastError : parseError;
  const stringErrors = [`${errorPrefix}${brokenContent.slice(0, 200)}`];

  if (isTruncated) {
    stringErrors.push(truncatedAfter);
  }

  return {
    errorPrefix,
    intactNames: report.items
      .filter(({end}) => end <= block.contentStart || end > block.contentEnd)
      .map(({name}) => name),
    isTruncated,
    situation: `block #${blockIndex} at ${relativePosition}${isTruncated ? ' (truncated)' : ''}`,
    sourceHtml: isTruncated ? corruptedHtml.slice(0, lastBlock.contentEnd + 6) : corruptedHtml,
    stringError: stringErrors.join('.\n'),
  };
};

const getStringCorruptionFailures = async ({
  intactNames,
  situation,
  sourceHtml,
  stringError,
}: CorruptionExpectation): Promise<readonly string[]> => {
  const failures: string[] = [];
  const result = await read(sourceHtml);

  if (result.names.join('\n') !== intactNames.join('\n')) {
    failures.push(`${situation}, string: items ${result.names.join(', ')}`);
  }

  if (result.error !== stringError) {
    failures.push(`${situation}, string: error "${result.error}"`);
  }

  return failures;
};

const getChunksCorruptionFailures = async (
  report: Report,
  {errorPrefix, intactNames, isTruncated, situation, sourceHtml}: CorruptionExpectation,
): Promise<readonly string[]> => {
  const failures: string[] = [];
  const allNames = report.items.map(({name}) => name);
  const result = await read(toAsyncChunks(sourceHtml, 4096));
  const missingNames = intactNames.filter((name) => !result.names.includes(name));
  const unknownNames = result.names.filter((name) => !allNames.includes(name));
  const errors = result.error?.split('.\n') ?? [];

  if (missingNames.length > 0 || unknownNames.length > 0) {
    failures.push(
      `${situation}, chunks: missing ${String(missingNames)}, unknown ${String(unknownNames)}`,
    );
  }

  const hasParseError = errors.some((error) => error.startsWith(errorPrefix));
  const hasTooLongError = errors.some((error) => error.length > errorPrefix.length + 200);

  if (!hasParseError || hasTooLongError || (isTruncated && !errors.includes(truncatedAfter))) {
    failures.push(`${situation}, chunks: error "${result.error}"`);
  }

  return failures;
};

const getCorruptionFailures = async (report: Report): Promise<readonly string[]> => {
  const lastBlockIndex = report.blocks.length - 1;
  const cases: readonly CorruptionCase[] = report.blocks
    .flatMap((_, blockIndex) =>
      [0, 0.5].flatMap((relativePosition) =>
        [false, true].map((isTruncated) => ({blockIndex, isTruncated, relativePosition})),
      ),
    )
    .filter(({blockIndex, isTruncated}) => !isTruncated || blockIndex !== lastBlockIndex);
  const failures: string[] = [];

  for (const corruptionCase of cases) {
    const expectation = getCorruptionExpectation(report, corruptionCase);

    failures.push(...(await getStringCorruptionFailures(expectation)));
    failures.push(...(await getChunksCorruptionFailures(report, expectation)));
  }

  return failures;
};

const getReadChunksCountOnFirstYield = async (
  chunks: readonly string[],
): Promise<number | undefined> => {
  let readChunksCount = 0;
  let readChunksCountOnFirstYield: number | undefined;

  async function* source(): AsyncGenerator<string> {
    for (const chunk of chunks) {
      readChunksCount += 1;

      yield await Promise.resolve(chunk);
    }
  }

  try {
    for await (const jsonData of readJsonDataFromHtmlReport(source())) {
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        readChunksCountOnFirstYield ??= readChunksCount;
      }
    }
  } catch {}

  return readChunksCountOnFirstYield;
};

test(
  'readJsonDataFromHtmlReport(...) function works correctly',
  {meta: {testId: '37'}, testTimeout: 60_000},
  // eslint-disable-next-line max-lines-per-function, max-statements
  async () => {
    const encoder = new TextEncoder();
    const testRuns = Array.from({length: 40}, (_, index) =>
      createTestRun(index, index === 5 ? 600 : 4 + (index % 8), index === 7),
    );
    const report = createReport([
      testRuns.slice(0, 3),
      testRuns.slice(3, 25),
      testRuns.slice(25, 26),
      createClientData(),
      testRuns.slice(26),
    ]);
    const {html} = report;
    const bytes = encoder.encode(html);
    const expectedNames = report.items.map(({name}) => name);
    const expectedJsons = report.items.map(({json}) => json);

    await expect(html.length, 'Test report is big enough for many chunks').gt(150_000);

    await expect(bytes.length, 'Test report contains multibyte characters').gt(html.length);

    const fromString = await read(html);

    await expect(fromString.jsons, 'All JSON data from complete report is read from string').eql(
      expectedJsons,
    );

    await expect(fromString.error, 'Complete report is read without error').eql(undefined);

    await expect(fromString.yields, 'Every <script> tag is yielded as one part from string').eql(
      report.blocks.length,
    );

    const fromChunks = await read(toAsyncChunks(html, 4096));

    await expect(fromChunks.jsons, 'All JSON data from complete report is read from chunks').eql(
      expectedJsons,
    );

    await expect(fromChunks.yields, 'Data from chunks is yielded by parts').gt(
      report.blocks.length,
    );

    await expect(
      (await read(toAsyncChunks(bytes, 4097))).jsons,
      'All JSON data from complete report is read from byte chunks',
    ).eql(expectedJsons);

    await expect(
      await getSourcesFailures(report, [
        {name: 'string', source: () => html},
        {name: 'Promise<string>', source: () => Promise.resolve(html)},
        {name: 'Uint8Array', source: () => bytes},
        {name: 'Promise<Uint8Array>', source: () => Promise.resolve(bytes)},
        {name: 'Iterable<string>', source: () => [...toChunks(html, 1000)]},
        {name: 'Iterable<Uint8Array>', source: () => [...toChunks(bytes, 1000)]},
        ...[1, 2, 7, 17, 18, 19, 58, 59, 60, 61, 100, 4096, 65_536, 1_000_000].map((size) => ({
          name: `string chunks of ${size}`,
          source: () => toAsyncChunks(html, size),
        })),
        ...[1, 2, 3, 7, 4097, 65_536].map((size) => ({
          name: `byte chunks of ${size}`,
          source: () => toAsyncChunks(bytes, size),
        })),
        ...[1, 2, 3].map((seed) => ({
          name: `random string chunks with seed ${seed}`,
          source: () => {
            const random = createRandom(seed);

            return toAsyncChunks(html, () => 1 + Math.floor(random() ** 2 * 30_000));
          },
        })),
        ...[1, 2, 22, 23, 24].map((size) => ({
          name: `last chunk of ${size}`,
          source: () => toAsyncParts([html.slice(0, -size), html.slice(-size)]),
        })),
        {name: 'empty last chunk', source: () => toAsyncParts([html, ''])},
        {name: 'empty chunks', source: () => toAsyncParts(['', ...toChunks(html, 5000), ''])},
      ]),
      'Complete report is read correctly from all kinds of sources',
    ).eql([]);

    await expect(
      await getTagSplitFailures(report),
      'First <script> tag split between chunks is found (the next tag is not taken instead)',
    ).eql([]);

    await expect(
      await getSeparatorSplitFailures(report),
      'Separator of test runs split between chunks does not break reading',
    ).eql([]);

    const parallelResults = await Promise.all(
      [1000, 1001, 999].map((size) => read(toAsyncChunks(bytes, size))),
    );

    await expect(
      parallelResults.map(
        ({error, jsons}) => error === undefined && jsons.join('\n') === expectedJsons.join('\n'),
      ),
      'Several reports are read in parallel from byte chunks without mixing their characters',
    ).eql([true, true, true]);

    let wasSourceRequested = false;
    let wasSourceClosed = false;

    const lazySource: AsyncIterable<string> = {
      [Symbol.asyncIterator]() {
        wasSourceRequested = true;

        const chunks = toChunks(html, 4096);

        return {
          next: () => Promise.resolve(chunks.next()),
          return: () => {
            wasSourceClosed = true;

            return Promise.resolve({done: true, value: undefined});
          },
        };
      },
    };

    const lazyGenerator = readJsonDataFromHtmlReport(lazySource);

    await expect(wasSourceRequested, 'Source is not read until iteration starts').eql(false);

    const firstPart = await lazyGenerator.next();

    await lazyGenerator.return(undefined);

    await expect(
      firstPart.done === true ? [] : [firstPart.value].flat().slice(0, 1).map(getItemName),
      'First yielded part contains the first test run',
    ).eql(expectedNames.slice(0, 1));

    await expect(wasSourceRequested, 'Source is read during iteration').eql(true);

    await expect(wasSourceClosed, 'Source is closed when iteration is stopped').eql(true);

    const firstContentStart = getFirstContentStart(report);

    await expect(
      (await read('')).error,
      'Empty string produces error about absence of JSON data',
    ).eql('Cannot find JSON data in HTML report');

    await expect(
      (await read(`${htmlPrefix}</body></html>`)).error,
      'HTML without JSON data produces error',
    ).eql('Cannot find JSON data in HTML report');

    await expect(
      (await read(toAsyncParts([]))).error,
      'Empty iterable produces error about absence of JSON data',
    ).eql('Source iterable contains no JSON data');

    await expect(
      (await read(toAsyncChunks(html.slice(0, firstContentStart - scriptTag.length), 1000))).error,
      'Iterable without JSON data produces error',
    ).eql('Source iterable contains no JSON data');

    await expect(
      (await read(Promise.reject(new Error('Network error')))).error,
      'Error of source promise is thrown',
    ).eql('Network error');

    const firstSeparatorIndex = html.indexOf(separator, firstContentStart);

    async function* failingSource(): AsyncGenerator<string> {
      yield await Promise.resolve(html.slice(0, firstSeparatorIndex + separator.length + 10));

      throw new Error('ECONNRESET');
    }

    const fromFailingSource = await read(failingSource());

    await expect(fromFailingSource.error, 'Error of source iterable is thrown').eql('ECONNRESET');

    await expect(
      fromFailingSource.names,
      'Data read before error of source iterable is yielded',
    ).eql(expectedNames.slice(0, 1));

    const smallReport = createReport([
      Array.from({length: 2}, (_, index) => createTestRun(100 + index, 2)),
      Array.from({length: 8}, (_, index) => createTestRun(200 + index, 1 + (index % 3))),
      createClientData(),
      Array.from({length: 5}, (_, index) => createTestRun(300 + index, 2)),
    ]);
    const smallNames = smallReport.items.map(({name}) => name);
    const truncationPoints = getTruncationPoints(smallReport);

    await expect(smallNames.length, 'Small report contains all test runs and client data').eql(16);

    await expect(truncationPoints.length, 'There are many points of report truncation').gt(300);

    await expect(
      await getTruncationFailures(smallReport, truncationPoints),
      'Truncated report yields all complete data, and then throws exact error',
    ).eql([]);

    await expect(
      await getCorruptionFailures(smallReport),
      'Invalid JSON in <script> tag is skipped with error, and all other data is read',
    ).eql([]);

    const twoCorruptedResult = await read(
      corruptBlock({...smallReport, html: corruptBlock(smallReport, 3, 0)}, 0, 0),
    );

    await expect(
      twoCorruptedResult.error?.split('.\n').map((error) => error.split(': ')[0]),
      'Errors from several invalid <script> tags are merged',
    ).eql([parseError.slice(0, -2), parseLastError.slice(0, -2)]);

    await expect(twoCorruptedResult.names, 'Data from valid <script> tags is read').eql(
      smallNames.slice(2, 11),
    );

    const hugeReport = createReport([
      [createTestRun(999, 1), createTestRun(1000, 6000), createTestRun(1001, 1)],
    ]);

    await expect(hugeReport.html.length, 'Huge test run is bigger than 1 MB').gt(1_000_000);

    const hugeStringDuration = await measure(() => read(hugeReport.html));
    let hugeResult: ReadResult | undefined;
    const hugeChunksDuration = await measure(async () => {
      hugeResult = await read(toAsyncChunks(hugeReport.html, 1024));
    });

    await expect(hugeResult?.names, 'Huge test run is read from small chunks').eql(
      hugeReport.items.map(({name}) => name),
    );

    await expect(
      hugeChunksDuration,
      'Huge test run is read from small chunks in linear time (not much slower than from string)',
    ).lt(hugeStringDuration * 10 + 200);

    const bigBlockReport = createReport([
      Array.from({length: 2000}, (_, index) => createTestRun(2000 + index, 3)),
      createClientData(),
    ]);

    await expect(bigBlockReport.html.length, 'Big <script> tag is bigger than 1 MB').gt(1_000_000);

    const bigBlockDuration = await measure(() => read(toAsyncChunks(bigBlockReport.html, 1024)));
    let corruptedBigBlockResult: ReadResult | undefined;
    const corruptedBigBlockDuration = await measure(async () => {
      corruptedBigBlockResult = await read(toAsyncChunks(corruptBlock(bigBlockReport, 0, 0), 1024));
    });

    await expect(
      corruptedBigBlockResult?.error?.startsWith(parseError),
      'Invalid big <script> tag produces parse error',
    ).eql(true);

    await expect(
      corruptedBigBlockResult?.names.at(-1),
      'Data after invalid big <script> tag is read',
    ).eql('apiStatistics');

    await expect(
      corruptedBigBlockDuration,
      'Invalid big <script> tag is read from small chunks in linear time',
    ).lt(bigBlockDuration * 5 + 200);

    const delayReport = createReport([
      Array.from({length: 2}, (_, index) => createTestRun(3000 + index, 2)),
      Array.from({length: 20}, (_, index) => createTestRun(3100 + index, 20)),
      createClientData(),
    ]);
    const [firstDelayBlock] = delayReport.blocks;

    assertValueIsDefined(firstDelayBlock, 'firstDelayBlock is defined');

    const {contentStart: delayContentStart} = firstDelayBlock;
    const delayHtml = `${delayReport.html.slice(0, delayContentStart + 1)}@${delayReport.html.slice(delayContentStart + 1)}`;
    const firstBlockEnd = firstDelayBlock.contentEnd + 1;
    const lastSeparatorOfFirstBlock = delayHtml.lastIndexOf(separator, firstBlockEnd);

    await expect(
      lastSeparatorOfFirstBlock,
      'Invalid first <script> tag still contains separator of test runs',
    ).gt(delayContentStart);

    const delayChunks = [
      delayHtml.slice(0, lastSeparatorOfFirstBlock - 100),
      delayHtml.slice(lastSeparatorOfFirstBlock - 100, firstBlockEnd + 200),
      ...toChunks(delayHtml.slice(firstBlockEnd + 200), 4096),
    ];

    await expect(
      await getReadChunksCountOnFirstYield(delayChunks),
      'Test runs after invalid <script> tag are yielded before the end of source',
    ).lt(delayChunks.length / 2);
  },
);
