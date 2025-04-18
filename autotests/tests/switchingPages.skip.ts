import {test} from 'autotests';
import {getUsers} from 'autotests/entities';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {GetUsers} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {navigateToPage, waitForRequestToRoute, waitForTimeout} from 'e2ed/actions';
import {log} from 'e2ed/utils';

const maxNumberOfRequests = 10;

const timeout = (maxNumberOfRequests + 2) * 1_000;

test('support switching of pages and tabs', {meta: {testId: '21'}}, async () => {
  let numberOfCaughtRequests = 0;
  let numberOfSentRequests = 0;

  setInterval(() => {
    if (numberOfSentRequests < maxNumberOfRequests) {
      numberOfSentRequests += 1;

      void getUsers();
    }
  }, 1_000);

  void waitForRequestToRoute(GetUsers, {
    predicate: (routeParams, request) => {
      numberOfCaughtRequests += 1;

      log(`Caught request number ${numberOfCaughtRequests}`, {routeParams, request});

      return false;
    },
    timeout,
  });

  await waitForTimeout(maxNumberOfRequests * 500);

  await navigateToPage(E2edReportExample);

  await waitForTimeout(maxNumberOfRequests * 500 + 1_000);

  await expect(numberOfSentRequests, 'all requests were caught').eql(numberOfCaughtRequests);
});
