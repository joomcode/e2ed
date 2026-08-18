/* eslint-disable @typescript-eslint/no-magic-numbers, max-lines */

import {test} from 'autotests';
import {expect} from 'e2ed';
import {E2edError, readFilesByGlobs} from 'e2ed/utils';
import {parseTest, ParseTestError} from 'e2ed/utils/parse';

const Given: (definition: string) => Promise<void> = async () => {};

const When: (definition?: string) => Promise<void> = async () => {};

const testsPattern = 'autotests/tests/**/*.ts';

// eslint-disable-next-line complexity, max-lines-per-function, max-statements
test('parseTest(...) function works correctly', {meta: {testId: '25'}}, async () => {
  await Given('First Given');
  await When('First When');

  const stepTokens = {Given: '^[ \t]*await Given\\(', When: '^[ \t]*await When\\('};

  /*

  await Given('Given inside comment');

   */

  // await When('When inside comment');

  let parseCurrentTest = false;

  for await (const {path, source} of readFilesByGlobs([testsPattern])) {
    const parsedTest = parseTest(source, stepTokens);

    const meta = parsedTest.options?.['meta'];

    if (meta == null || typeof meta !== 'object') {
      throw new E2edError('meta is not an object', {parsedTest, path});
    }

    await When();

    const testId = 'testId' in meta ? meta.testId : undefined;

    if (typeof testId !== 'string' || !Number.isInteger(Number(testId))) {
      throw new E2edError('testId is not an integer', {parsedTest, path});
    }

    if (testId !== '25') {
      parseCurrentTest = true;

      await expect(parsedTest.steps.length, 'Other tests have no steps').eql(0);

      await expect(parsedTest.testLineNumber, 'Parsed test has correct test line number').gt(1);
    } else {
      await expect(parsedTest.steps.length, 'This test has steps').eql(3);

      await expect(parsedTest.testLineNumber, 'Parsed test has correct test line number').gt(1);

      await expect(
        parsedTest.steps[0]?.kind === 'Given' &&
          parsedTest.steps[0]?.definition === 'First Given' &&
          parsedTest.steps[0]?.column === 3 &&
          parsedTest.steps[0]?.line === 16,
        'First step is correct',
      ).ok();

      await expect(
        parsedTest.steps[1]?.kind === 'When' &&
          parsedTest.steps[1]?.definition === 'First When' &&
          parsedTest.steps[1]?.column === 3 &&
          parsedTest.steps[1]?.line === 17,
        'Second step is correct',
      ).ok();

      await expect(
        parsedTest.steps[2]?.kind === 'When' &&
          parsedTest.steps[2]?.definition === undefined &&
          parsedTest.steps[2]?.column === 5 &&
          parsedTest.steps[2]?.line === 40,
        'Third step is correct',
      ).ok();
    }
  }

  await expect(parseCurrentTest, 'Parse current test file').ok();

  await expect(
    parseTest('test(`Foo`, async () => {});', stepTokens).options,
    'Support tests without options',
  ).eql(undefined);

  await expect(
    parseTest('test(`Foo`, async () => {});', stepTokens).name === 'Foo',
    'Backtick strings are supported',
  ).ok();

  await expect(
    parseTest("test('Foo', {meta: {url: 'https://x.com'}}, async () => {});").options,
    'Correctly parse urls in options',
  ).eql({meta: {url: 'https://x.com'}});

  try {
    parseTest(["test('Foo', async () => {});", "test('Bar', async () => {});"].join('\n'));

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError && error.message.includes('second test'),
      'Correctly throw when file contains two tests',
    ).ok();
  }

  try {
    parseTest(["await When('Foo');", "test('Bar', async () => {});"].join('\n'), stepTokens);

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError && error.message.includes('Step "When" precedes'),
      'Correctly throw when step precedes the test',
    ).ok();
  }

  const globalObject = globalThis as unknown as {parseOptionsEvaluations?: number};

  globalObject.parseOptionsEvaluations = 0;

  await expect(
    parseTest("test('Foo', {count: (globalThis.parseOptionsEvaluations += 1)}, async () => {});")
      .options,
    'Options object is correctly parsed',
  ).eql({count: 1});

  await expect(
    globalObject.parseOptionsEvaluations,
    'Options literal is evaluated exactly once',
  ).eql(1);

  await expect(
    parseTest("test('Foo', {meta: {testId: '25', lang: Language}}, async () => {});").options,
    'Unknown identifiers in options are replaced with `<unknown>` string',
  ).eql({meta: {lang: '<unknown>', testId: '25'}});

  await expect(
    parseTest("test('Foo', {lang: Language.En}, async () => {});").options?.['lang'],
    'Property access on unknown identifier gives undefined',
  ).eql(undefined);

  await expect(
    parseTest("test('Foo', {a: A1, b: B2, c: C3, d: D4, e: E5, f: F6, g: G7}, async () => {});")
      .options,
    'Up to seven distinct unknown identifiers in options are supported',
  ).eql({
    a: '<unknown>',
    b: '<unknown>',
    c: '<unknown>',
    d: '<unknown>',
    e: '<unknown>',
    f: '<unknown>',
    g: '<unknown>',
  });

  try {
    parseTest(
      "test('Foo', {a: A1, b: B2, c: C3, d: D4, e: E5, f: F6, g: G7, h: H8}, async () => {});",
    );

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError && error.message.includes('Cannot parse options object'),
      'Correctly throw when options contain more than seven unknown identifiers',
    ).ok();
  }

  try {
    parseTest("test('Foo', {meta: getMeta()}, async () => {});");

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError && error.message.includes('Cannot parse options object'),
      'Correctly throw when options call an unknown function',
    ).ok();
  }

  const crlfParsedTest = parseTest(
    [
      "test('Crlf', {meta: {testId: '25'}}, async () => {",
      "  await Given('a');",
      "  await When('b');",
      '});',
    ].join('\r\n'),
    stepTokens,
  );

  await expect(crlfParsedTest.testLineNumber, 'CRLF: parsed test has exact test line number').eql(
    1,
  );

  await expect(
    crlfParsedTest.steps[0]?.kind === 'Given' &&
      crlfParsedTest.steps[0]?.definition === 'a' &&
      crlfParsedTest.steps[0]?.line === 2 &&
      crlfParsedTest.steps[0]?.column === 3,
    'CRLF: first step has exact position',
  ).ok();

  await expect(
    crlfParsedTest.steps[1]?.kind === 'When' &&
      crlfParsedTest.steps[1]?.definition === 'b' &&
      crlfParsedTest.steps[1]?.line === 3 &&
      crlfParsedTest.steps[1]?.column === 3,
    'CRLF: second step has exact position',
  ).ok();

  try {
    parseTest("test('Foo', {meta: {}});");

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError &&
        error.message.includes('Cannot find end of test definition'),
      'Correctly throw when test has no `async () => {` part',
    ).ok();
  }

  try {
    parseTest("test('Foo', someOptions, async () => {});");

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError && error.message.includes('is not an options object'),
      'Correctly throw when second argument of test is not an object literal',
    ).ok();
  }

  try {
    parseTest(
      ["test('Foo', async () => {", "  await When('unterminated", '});'].join('\n'),
      stepTokens,
    );

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError &&
        error.message.includes('Cannot find end of step definition string'),
      'Correctly throw when step definition string is unterminated',
    ).ok();
  }

  try {
    parseTest('const foo = 1;\n');

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError && error.message.includes('contains no tests'),
      'Correctly throw when file contains no tests',
    ).ok();
  }

  await expect(
    parseTest("test('It\\'s \"quoted\"', {meta: {}}, async () => {});").name,
    'Escaped quotes in test name are unescaped',
  ).eql('It\'s "quoted"');

  await expect(
    parseTest(
      ["test('Foo', async () => {", "  await When('It\\'s');", '});'].join('\n'),
      stepTokens,
    ).steps[0]?.definition,
    'Escaped quotes in step definition are unescaped',
  ).eql("It's");

  await expect(
    parseTest(['// Comment', '', "test('Foo', {meta: {}}, async () => {});"].join('\n'))
      .testLineNumber,
    'Parsed test has exact test line number',
  ).eql(3);

  const withMultilineComments = parseTest(
    "test( /* one */ 'Foo' /* two */ , /* three */ {meta: {testId: '25' /* four */}} /* five */ , /* six */ async () => {});",
  );

  await expect(
    withMultilineComments.name,
    'Multiline comments in all positions of test header do not break the test name',
  ).eql('Foo');

  await expect(
    withMultilineComments.options,
    'Multiline comments in all positions of test header are stripped from options',
  ).eql({meta: {testId: '25'}});

  const withSinglelineComments = parseTest(
    [
      'test( // one',
      "  'Foo', // two",
      '  // three',
      '  {',
      '    // four',
      "    meta: {testId: '25'}, // five",
      '  }, // six',
      '  async () => {});',
    ].join('\n'),
  );

  await expect(
    withSinglelineComments.name,
    'Singleline comments in all positions of test header do not break the test name',
  ).eql('Foo');

  await expect(
    withSinglelineComments.options,
    'Singleline comments in all positions of test header are stripped from options',
  ).eql({meta: {testId: '25'}});

  await expect(
    withSinglelineComments.testLineNumber,
    'Comments in test header do not affect test line number',
  ).eql(1);

  await expect(
    parseTest(
      ["test('Foo', {meta: {testId: '25'}},", '  /* async () => { */', '  async () => {});'].join(
        '\n',
      ),
    ).options,
    'Comment containing `async () => {` does not end the test header',
  ).eql({meta: {testId: '25'}});

  await expect(
    parseTest(
      [
        "test('Foo', {",
        '  /* multi',
        "     line 'with quote and braces {}',",
        '     comment */',
        "  meta: {testId: '25'},",
        '}, async () => {});',
      ].join('\n'),
    ).options,
    'Multiline comment spanning several lines inside options is stripped',
  ).eql({meta: {testId: '25'}});

  const namesWithBackslashes: readonly [nameSource: string, expectedName: string][] = [
    [String.raw`'a\'b'`, "a'b"],
    [String.raw`'a\\'`, 'a\\'],
    [String.raw`'a\\\'b'`, "a\\'b"],
    [String.raw`'a\\\\'`, 'a\\\\'],
    [String.raw`'a\\\\\'b'`, "a\\\\'b"],
    [String.raw`'a\\\\\\'`, 'a\\\\\\'],
    [String.raw`'a\\\\\\\'b'`, "a\\\\\\'b"],
    [String.raw`'a\\\\\\\\'`, 'a\\\\\\\\'],
  ];

  for (const [nameSource, expectedName] of namesWithBackslashes) {
    const parsedTestWithBackslashes = parseTest(
      `test(${nameSource}, {meta: {testId: '25'}}, async () => {});`,
    );

    await expect(
      parsedTestWithBackslashes.name,
      `Backslashes in test name ${nameSource} are correctly unescaped`,
    ).eql(expectedName);

    await expect(
      parsedTestWithBackslashes.options,
      `End of test name string ${nameSource} is correctly found`,
    ).eql({meta: {testId: '25'}});
  }

  await expect(
    parseTest(
      ["test('Foo', async () => {", String.raw`  await When('a\\');`, '});'].join('\n'),
      stepTokens,
    ).steps[0]?.definition,
    'Escaped backslash at the end of step definition is correctly parsed',
  ).eql('a\\');

  await expect(
    parseTest(
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        "  const p = '**/autotests/**/*.ts';",
        "  await Given('a');",
        '});',
      ].join('\n'),
      stepTokens,
    ).steps.map(({kind, definition, line}) => `${kind}:${definition}:${line}`),
    'String literal with `/*` (glob pattern) does not swallow the following steps',
  ).eql(['Given:a:3']);

  await expect(
    parseTest(
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        "  const routePart = 'foo/*bar';",
        "  await Given('a');",
        '  /* real comment */',
        "  await When('b');",
        '});',
      ].join('\n'),
      stepTokens,
    ).steps.map(({kind}) => kind),
    'Unclosed `/*` inside string literal does not open a comment',
  ).eql(['Given', 'When']);

  const withTemplateLiteral = parseTest(
    [
      "test('T', {meta: {testId: '1'}}, async () => {",
      '  const code = `',
      "test('Fake', {meta: {testId: '2'}}, async () => {",
      "  await Given('fake step');",
      '});',
      '  `;',
      "  await When('real');",
      '});',
    ].join('\n'),
    stepTokens,
  );

  await expect(
    withTemplateLiteral.name,
    'Fake `test(` inside template literal does not become a second test',
  ).eql('T');

  await expect(
    withTemplateLiteral.steps.map(({kind, definition}) => `${kind}:${definition}`),
    'Fake step inside template literal is not parsed as a step',
  ).eql(['When:real']);

  await expect(
    parseTest(
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        "  // don't break parsing",
        "  await Given('a');",
        '});',
      ].join('\n'),
      stepTokens,
    ).steps.map(({kind}) => kind),
    'Apostrophe inside comment does not open a string literal',
  ).eql(['Given']);

  await expect(
    parseTest(
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        "  await Given('see https://x.com/docs');",
        "  await When('b');",
        '});',
      ].join('\n'),
      stepTokens,
    ).steps.map(({kind, definition, line}) => `${kind}:${definition}:${line}`),
    'Step definition with `//` (URL) is parsed correctly',
  ).eql(['Given:see https://x.com/docs:2', 'When:b:3']);

  await expect(
    parseTest(
      String.raw`test('T', {meta: {testId: '1', a: 'don\'t } {', b: "x /* y", c: 'z // w'}}, async () => {});`,
    ).options,
    'Braces, quotes and comment-like text inside options strings are parsed correctly',
  ).eql({meta: {a: "don't } {", b: 'x /* y', c: 'z // w', testId: '1'}});

  await expect(
    parseTest(
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        '  const q = "foo/*bar";',
        "  await Given('a');",
        '  /* real */',
        "  await When('b');",
        '});',
      ].join('\n'),
      stepTokens,
    ).steps.map(({kind}) => kind),
    'Double quoted string with comment-like content is skipped correctly',
  ).eql(['Given', 'When']);

  try {
    parseTest(
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        '  const code = `unterminated',
        '});',
      ].join('\n'),
      stepTokens,
    );

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError && error.message.includes('started with backtick'),
      'Correctly throw when backtick string literal is unterminated',
    ).ok();
  }

  await expect(
    parseTest(
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        '  await When( /* no definition */ );',
        '});',
      ].join('\n'),
      stepTokens,
    ).steps[0]?.definition,
    'Comments without step definition still give undefined definition',
  ).eql(undefined);

  try {
    parseTest(
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        '  await Given( /* unterminated comment',
        '});',
      ].join('\n'),
      stepTokens,
    );

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof ParseTestError &&
        error.message.includes('Cannot find end of multiline comment'),
      'Correctly throw when comment before step definition is unterminated',
    ).ok();
  }

  const stepsWithCommentsBeforeDefinition: readonly [
    caseName: string,
    sourceLines: readonly string[],
  ][] = [
    [
      'multiline comment inline',
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        "  await Given( /* some comment */ \t 'First Given');",
        '});',
      ],
    ],
    [
      'singleline comment on separate line',
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        '  await Given(',
        '  \r  // Some comment.',
        "    'First Given',",
        '  );',
        '});',
      ],
    ],
    [
      'two singleline comments',
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        '  await Given(',
        '    // First comment.',
        '    // Second comment.',
        "    'First Given',",
        '  );',
        '});',
      ],
    ],
    [
      'two multiline comments',
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        "  await Given( /* one */ /* two */ \t'First Given');",
        '});',
      ],
    ],
    [
      'singleline comment, then multiline comment',
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        '  await Given(',
        '    // one',
        "    /* two */ 'First Given',",
        '  );',
        '});',
      ],
    ],
    [
      'multiline comment, then singleline comment',
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        '  await Given( /* one */',
        '    // two',
        "    'First Given',",
        '  );',
        '});',
      ],
    ],
    [
      'comment with quote inside',
      [
        "test('T', {meta: {testId: '1'}}, async () => {",
        "  await Given( /* don't */ 'First Given');",
        '});',
      ],
    ],
  ];

  for (const [caseName, sourceLines] of stepsWithCommentsBeforeDefinition) {
    const stepWithComments = parseTest(sourceLines.join('\n'), stepTokens).steps[0];

    await expect(
      stepWithComments?.kind === 'Given' &&
        stepWithComments?.definition === 'First Given' &&
        stepWithComments?.line === 2,
      `Comments between step token and step definition are skipped (${caseName})`,
    ).ok();
  }
});
