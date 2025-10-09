import {List} from '../client';

import {compareByStatuses} from './compareByStatuses';
import {locator} from './locator';
import {RetryHeader} from './RetryHeader';
import {TestRunButton} from './TestRunButton';

import type {RetryProps} from '../../../types/internal';

declare const jsx: JSX.Runtime;

type Props = Readonly<{retry: RetryProps}>;

/**
 * Renders test runs list for one retry.
 * @internal
 */
export const Retry: JSX.Component<Props> = ({retry}) => {
  const sortedTestRunButtons = [...retry.testRunButtons].sort(compareByStatuses);

  const buttons = sortedTestRunButtons.map((props, index) => (
    <TestRunButton {...props} index={index} />
  ));

  return (
    <article
      class="retry"
      id={`retry${retry.retryIndex}`}
      hidden={retry.hidden}
      {...locator('Retry', {index: retry.retryIndex})}
    >
      <RetryHeader {...retry} />
      <div class="tests-group">
        <List elements={buttons} />
      </div>
    </article>
  );
};
