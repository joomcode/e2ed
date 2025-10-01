import {createSafeHtmlWithoutSanitize} from '../client';

declare const jsx: JSX.Runtime;

type Props = Readonly<{warnings: readonly string[]}>;

/**
 * Renders report warnings.
 * @internal
 */
export const Warnings: JSX.Component<Props> = ({warnings}) => {
  if (warnings.length === 0) {
    return <></>;
  }

  const renderedWarnings = warnings.map((warning) => <div class="__error">{warning}</div>);

  return <div class="warnings">{createSafeHtmlWithoutSanitize`${renderedWarnings.join('')}`}</div>;
};
