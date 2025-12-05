import {test} from 'autotests';
import {step} from 'e2ed';
import {waitForTimeout} from 'e2ed/actions';
import {LogEventType} from 'e2ed/constants';
import {assertFunctionThrows, log} from 'e2ed/utils';

test('step(...) function works correctly', {meta: {testId: '23'}}, async () => {
  const timeout = 30;
  const timeoutAddition = 10;

  await step('First step', (): undefined => {});

  await step('Step level 1', async () => {
    await step('Step level 2');
    await step('Skipped step level 2', () => {}, {skipLogs: true});

    log('Some log on level 2', {payload: 18});

    await step('Step level 2 with children', async () => {
      await step('Step level 3 with action type', () => {}, {
        payload: {initialPayload: 10},
        timeout: 10,
        type: LogEventType.Action,
      });

      await step('Step level 3', async () => {
        await step('Step level 4');

        await assertFunctionThrows(async () => {
          await step(
            'Failed step with timeout',
            async () => {
              await waitForTimeout(timeout + timeoutAddition);

              await step('Also failed step', () => {
                throw new Error('This step should be torn out of the tree');
              });
            },
            {runPlaywrightStep: true, timeout},
          );
        }, 'step body throws an error on timeout end');

        await step(
          'Step level 4 with running playwright step',
          () => ({finalPayload: 40, initialPayload: 30}),
          {payload: {initialPayload: 20}, runPlaywrightStep: true},
        );

        log('Some log on level 4');
      });

      log('Some log on level 3', {level: 3});
    });

    log('Also some log on level 2', {level: 2});
  });
});
