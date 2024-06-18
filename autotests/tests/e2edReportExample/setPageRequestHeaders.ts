import {test} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {navigateToPage, waitForResponse} from 'e2ed/actions';

const headerName = 'x-custom-header';
const pageRequestHeaders = {[headerName]: 'foo'};

test('set page request headers correctly', {meta: {testId: '17'}}, async () => {
  const promise = waitForResponse(
    ({request}) => request.requestHeaders[headerName] === pageRequestHeaders[headerName],
    {includeNavigationRequest: true},
  );

  await navigateToPage(E2edReportExample, {pageRequestHeaders});

  await promise;
});
