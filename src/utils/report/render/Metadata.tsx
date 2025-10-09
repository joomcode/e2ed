import type {ApiStatisticsReportHash} from '../../../types/internal';

declare const jsx: JSX.Runtime;

type Props = Readonly<{menuIndex: number}>;

/**
 * Renders metadata of whole `e2ed` run.
 * @internal
 */
export const Metadata: JSX.Component<Props> = ({menuIndex}) => {
  const pagesHash: ApiStatisticsReportHash = 'api-statistics-pages';
  const requestsHash: ApiStatisticsReportHash = 'api-statistics-requests';
  const resourcesHash: ApiStatisticsReportHash = 'api-statistics-resources';

  return (
    <article class="retry" id={`retry${menuIndex}`} hidden>
      <h3 class="retry__title">Metadata</h3>
      <div class="tests-group">
        <button class="test-link" data-runhash={pagesHash}>
          Pages statistics
        </button>
        <button class="test-link" data-runhash={requestsHash}>
          Requests statistics
        </button>
        <button class="test-link" data-runhash={resourcesHash}>
          Resources statistics
        </button>
      </div>
    </article>
  );
};
