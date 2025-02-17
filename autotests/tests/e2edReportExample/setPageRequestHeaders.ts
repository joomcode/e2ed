import {test} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {navigateToPage, waitForResponse} from 'e2ed/actions';

const headerName = 'x-custom-header';
const pageRequestHeaders = {[headerName]: 'foo'};

test('set page request headers correctly', {meta: {testId: '17'}}, async () => {
  await waitForResponse(
    ({request}) => request.requestHeaders[headerName] === pageRequestHeaders[headerName],
    async () => {
      await navigateToPage(E2edReportExample, {pageRequestHeaders});
    },
    {includeNavigationRequest: true},
  );
});
