import {test} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {navigateToPage, waitForRequest} from 'e2ed/actions';

const headerName = 'x-custom-header';
const pageRequestHeaders = {[headerName]: 'foo'};

test('set page request headers correctly', {meta: {testId: '17'}}, async () => {
  void navigateToPage(E2edReportExample, {pageRequestHeaders});

  await waitForRequest(
    ({requestHeaders}) => requestHeaders[headerName] === pageRequestHeaders[headerName],
  );
});
