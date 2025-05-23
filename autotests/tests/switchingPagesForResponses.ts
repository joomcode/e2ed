/* eslint-disable @typescript-eslint/no-magic-numbers */

import {test} from 'autotests';
import {getUsers} from 'autotests/entities';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {GetUsers} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {
  click,
  navigateToPage,
  switchToTab,
  waitForNewTab,
  waitForResponseToRoute,
  waitForTimeout,
} from 'e2ed/actions';
import {log} from 'e2ed/utils';

const maxNumberOfRequests = 15;

const timeout = (maxNumberOfRequests + 10) * 1_000;

test(
  'support switching of tabs for waitForResponse',
  {enableCsp: false, meta: {testId: '22'}, testTimeout: timeout + 1_000},
  async () => {
    let numberOfCaughtResponses = 0;
    let numberOfSentRequests = 0;

    setInterval(() => {
      if (numberOfSentRequests < maxNumberOfRequests) {
        numberOfSentRequests += 1;

        log(`Sent request number ${numberOfSentRequests}`);

        void getUsers({retries: 1});
      }
    }, 1_000);

    void waitForResponseToRoute(GetUsers, {
      predicate: (routeParams, response) => {
        numberOfCaughtResponses += 1;

        log(`Caught response number ${numberOfCaughtResponses}`, {response, routeParams});

        return false;
      },
      timeout,
    });

    await waitForTimeout(maxNumberOfRequests * 333);

    const reportPage = await navigateToPage(E2edReportExample);

    await waitForTimeout(maxNumberOfRequests * 333);

    const npmPageTab = await waitForNewTab(async () => {
      await click(reportPage.header);
    });

    await switchToTab(npmPageTab);

    await waitForTimeout(maxNumberOfRequests * 333 + 1_000);

    await expect(
      numberOfSentRequests === numberOfCaughtResponses ||
        numberOfSentRequests === numberOfCaughtResponses + 2 ||
        numberOfSentRequests === numberOfCaughtResponses + 1 ||
        numberOfSentRequests === numberOfCaughtResponses - 1,
      `almost all responses were caught (${numberOfCaughtResponses} of ${numberOfSentRequests})`,
    ).ok();
  },
);
