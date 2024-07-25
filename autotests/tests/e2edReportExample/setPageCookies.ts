import {test} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {expect} from 'e2ed';
import {navigateToPage} from 'e2ed/actions';
import {getDocumentCookie} from 'e2ed/utils';

const cookieTimeLifeInMs = 90_000;

const cookie = {
  expires: Date.now() + cookieTimeLifeInMs,
  httpOnly: false,
  name: 'e2edFooCookie',
  path: '/',
  sameSite: 'Strict',
  secure: true,
  value: 'bar',
} as const;

test('set page cookies correctly', {meta: {testId: '5'}, testIdleTimeout: 35_000}, async () => {
  await navigateToPage(E2edReportExample, {pageCookies: [cookie]});

  const documentCookie = await getDocumentCookie();

  await expect(documentCookie, 'cookie e2edFooCookie=bar exists on page').contains(
    'e2edFooCookie=bar',
  );
});
