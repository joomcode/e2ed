import {expect, it} from 'e2ed';
import {navigateToPage} from 'e2ed/actions';
import {E2edReportExample} from 'e2ed/pageObjects/pages';
import {getDocumentCookie} from 'e2ed/utils';

const cookie = {
  expires: Date.now() + 90_000,
  httpOnly: false,
  name: 'e2edBarCookie',
  path: '/',
  sameSite: 'strict',
  secure: true,
  value: 'bar',
} as const;

it('set page cookies', {meta: {testId: '5'}, testIdleTimeout: 35_000}, async () => {
  await navigateToPage(E2edReportExample, {pageCookies: [cookie]});

  const documentCookie = await getDocumentCookie();

  await expect(documentCookie, 'e2edBarCookie=bar exists on page').contains('e2edBarCookie=bar');
});
