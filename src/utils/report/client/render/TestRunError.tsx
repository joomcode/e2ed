import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import type {RunError} from '../../../../types/internal';

const sanitizeHtml = clientSanitizeHtml;

declare const jsx: JSX.Runtime;

type Props = Readonly<{runError: RunError}>;

/**
 * Renders `TestRun` error as simple message.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const TestRunError: JSX.Component<Props> = ({runError}) => {
  if (runError === undefined) {
    return sanitizeHtml``;
  }

  // eslint-disable-next-line no-control-regex
  const stylesRegexp = /((\\x1B\[)|(\x1B\[)|(\\u001b\[)|(\u001b\[))[\d;]*m/gi;

  const runErrorWithoutStyle = String(runError).replace(stylesRegexp, '');

  return (
    <div class="status-detail status-detail_status_failed">
      <div class="status-detail__content">
        <code class="status-detail__button-text">{runErrorWithoutStyle}</code>
      </div>
    </div>
  );
};
