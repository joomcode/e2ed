import {Duration} from '../client';

import {locator} from './locator';

import type {TestRunButtonProps} from '../../../types/internal';

declare const jsx: JSX.Runtime;

type Props = TestRunButtonProps & Readonly<{index: number}>;

const testId = 'TestRunButton';

/**
 * Renders single test run button (in test runs list).
 * @internal
 */
export const TestRunButton: JSX.Component<Props> = ({
  endTimeInMs,
  index,
  mainParams,
  name,
  runHash,
  startTimeInMs,
  status,
}) => {
  const durationInMs = endTimeInMs - startTimeInMs;

  return (
    <button
      class="test-link"
      data-runhash={runHash}
      data-status={status}
      {...locator(testId, {mainParams, status})}
    >
      {/*
      <span class="test-link__order" {...locator(testId, 'order')}>
        #{index + 1}
      </span>
      */}
      <span class="test-link__name" {...locator(testId, 'name')}>
        <span class="test-link__main-params" {...locator(testId, 'parameters')}>
          {mainParams}
        </span>
        {name}
      </span>
      <span class="test-link__duration" {...locator(testId, 'duration')}>
        <Duration durationInMs={durationInMs} />
      </span>
    </button>
  );
};
