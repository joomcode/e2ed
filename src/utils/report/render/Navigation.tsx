import {locator} from './locator';
import {Logo} from './Logo';
import {RetriesButtons} from './RetriesButtons';

import type {RetryProps} from '../../../types/internal';

declare const jsx: JSX.Runtime;

type Props = Readonly<{retries: readonly RetryProps[]}>;

/**
 * Renders tag `<nav>`.
 * @internal
 */
export const Navigation: JSX.Component<Props> = ({retries}) => (
  <>
    <header class="header" {...locator('header')}>
      <Logo />
    </header>
    <nav class="column-1" {...locator('column-1')}>
      <RetriesButtons retries={retries} />
    </nav>
  </>
);
