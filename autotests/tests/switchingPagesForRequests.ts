/* eslint-disable @typescript-eslint/no-magic-numbers */

import {test} from 'autotests';
import {getUsers} from 'autotests/entities';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {GetUsers} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {
  navigateToPage,
  switchToTab,
  waitForNewTab,
  waitForRequestToRoute,
  waitForTimeout,
} from 'e2ed/actions';
import {log} from 'e2ed/utils';

const maxNumberOfRequests = 15;

const timeout = (maxNumberOfRequests + 10) * 1_000;

test(
  'support switching of tabs for waitForRequest',
  {enableCsp: false, meta: {testId: '21'}, testTimeout: timeout + 1_000},
  async () => {
    let numberOfCaughtRequests = 0;
    let numberOfSentRequests = 0;

    setInterval(() => {
      if (numberOfSentRequests < maxNumberOfRequests) {
        numberOfSentRequests += 1;

        log(`Sent request number ${numberOfSentRequests}`);

        void getUsers({retries: 1});
      }
    }, 1_000);

    void waitForRequestToRoute(GetUsers, {
      predicate: (routeParams, request) => {
        numberOfCaughtRequests += 1;

        log(`Caught request number ${numberOfCaughtRequests}`, {request, routeParams});

        return false;
      },
      timeout,
    });

    await waitForTimeout(maxNumberOfRequests * 333);

    const reportPage = await navigateToPage(E2edReportExample);

    await waitForTimeout(maxNumberOfRequests * 333);

    const npmPageTab = await waitForNewTab(
      async () => {
        await reportPage.clickLogo();
      },
      {timeout: 10_000},
    );

    await switchToTab(npmPageTab);

    await waitForTimeout(maxNumberOfRequests * 333 + 1_000);

    await expect(
      numberOfSentRequests === numberOfCaughtRequests ||
        numberOfSentRequests === numberOfCaughtRequests + 1 ||
        numberOfSentRequests === numberOfCaughtRequests - 1,
      `almost all responses were caught (${numberOfCaughtRequests} of ${numberOfSentRequests})`,
    ).ok();
  },
);
