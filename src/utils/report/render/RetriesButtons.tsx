import {List} from '../client';

import {locator} from './locator';
import {RetryButton} from './RetryButton';

import type {RetryProps, SafeHtml} from '../../../types/internal';

declare const jsx: JSX.Runtime;

type Props = Readonly<{retries: readonly RetryProps[]}>;

/**
 * Renders retries navigation buttons.
 * @internal
 */
export const RetriesButtons: JSX.Component<Props> = ({retries}) => {
  const retryNumbers = retries.map(({retryIndex}) => retryIndex);
  const maxRetry = Math.max(...retryNumbers);
  const buttons: SafeHtml[] = [];

  for (let index = 1; index <= maxRetry + 1; index += 1) {
    const isRetry = retryNumbers.includes(index);
    const isMeta = index === maxRetry + 1;

    buttons[index] = (
      <RetryButton
        disabled={isMeta ? false : !isRetry}
        name={isMeta ? 'Meta' : `Retry ${index}`}
        retry={index}
        selected={index === maxRetry}
      />
    );
  }

  return (
    <div class="retry-links" aria-label="Retries" {...locator('RetriesButtons')}>
      <List elements={buttons} />
    </div>
  );
};
