import {locator} from './locator';

import type {RetryButtonProps} from '../../../types/internal';

declare const jsx: JSX.Runtime;

type Props = RetryButtonProps;

/**
 * Renders tag `<button>` with single retry button.
 * @internal
 */
export const RetryButton: JSX.Component<Props> = ({disabled, name, retry, selected}) => (
  <button
    class="retry-link"
    disabled={disabled}
    aria-current={selected ? true : undefined}
    {...locator('RetryButton', {disabled, retry, selected})}
  >
    {name}
  </button>
);
