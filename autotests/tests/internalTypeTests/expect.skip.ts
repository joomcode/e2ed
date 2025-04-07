/* eslint-disable @typescript-eslint/no-unsafe-call */

import {htmlElementSelector} from 'autotests/selectors';
import {expect} from 'e2ed';

const someNumber = 3;

// ok
void expect(someNumber, '').eql(someNumber);

// @ts-expect-error: wrong arguments
void expect(someNumber, '').eql('');

// @ts-expect-error: wrong number of arguments
void expect(someNumber).eql(someNumber);

// ok
void expect(htmlElementSelector.textContent, '').eql('some text');

// ok
void expect(htmlElementSelector, '').toMatchScreenshot('some id');

// ok
void expect(htmlElementSelector, '').toMatchScreenshot('some id', {scale: 'css', timeout: 1_000});

// @ts-expect-error: toMatchScreenshot is acceptable only for selectors
void expect(htmlElementSelector.textContent, '').toMatchScreenshot('some id');

// @ts-expect-error: eql is acceptable only for non-selectors
void expect(htmlElementSelector, '').eql(htmlElementSelector);

// ok
void (expect('foo', 'foo is correct').toBe('foo') satisfies Promise<void>);

// ok
void (expect('foo', 'foo is correct').toBeDefined() satisfies Promise<void>);
