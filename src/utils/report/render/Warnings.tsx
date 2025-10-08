import {List} from '../client';

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

  const renderedWarnings = warnings.map((warning) => <div class="warnings__error">{warning}</div>);

  return (
    <div class="warnings">
      <List elements={renderedWarnings} />
    </div>
  );
};
