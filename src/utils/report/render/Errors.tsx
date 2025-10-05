import {List} from '../client';

declare const jsx: JSX.Runtime;

type Props = Readonly<{errors: readonly string[]}>;

/**
 * Renders report errors.
 * @internal
 */
export const Errors: JSX.Component<Props> = ({errors}) => {
  if (errors.length === 0) {
    return <></>;
  }

  const renderedErrors = errors.map((error) => <div class="__error">{error}</div>);

  return (
    <div class="errors">
      <List elements={renderedErrors} />
    </div>
  );
};
