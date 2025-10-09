import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import type {RunError} from '../../../../types/internal';

const sanitizeHtml = clientSanitizeHtml;

declare const jsx: JSX.Runtime;

type Props = Readonly<{runError: RunError}>;

/**
 * Renders `TestRun` error as a simple message.
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
    <section class="test-error" aria-label="Test error">
      <div class="test-error__content">
        <pre>
          <code>{runErrorWithoutStyle}</code>
        </pre>
      </div>
    </section>
  );
};
