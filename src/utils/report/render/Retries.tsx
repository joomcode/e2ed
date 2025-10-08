import {List} from '../client';

import {Metadata} from './Metadata';
import {Retry} from './Retry';

import type {RetryProps} from '../../../types/internal';

declare const jsx: JSX.Runtime;

type Props = Readonly<{retries: readonly RetryProps[]}>;

/**
 * Renders list of retries (with test runs).
 * @internal
 */
export const Retries: JSX.Component<Props> = ({retries}) => {
  const retriesHtml = retries.map((retry) => <Retry retry={retry} />);

  retriesHtml.push(<Metadata menuIndex={retries.length + 1} />);

  return <List elements={retriesHtml} />;
};
