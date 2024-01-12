import type {Inner} from 'testcafe-without-typecheck';

import type {CdpClient} from './cdp';
import type {DeepReadonly} from './deep';

/**
 * TestCafe browser client.
 * @internal
 */
type TestCafeBrowserClient = DeepReadonly<{
  _clientKey: string;
  _clients: Record<string, {client: CdpClient; inactive: boolean}>;
}>;

/**
 * Original selector from TestCafe.
 */
export type TestCafeSelector = Inner.Selector;

/**
 * TestCafe browser connection.
 * @internal
 */
export type TestCafeBrowserConnection = DeepReadonly<{
  id: unknown;
  provider: {plugin: {openedBrowsers: Record<string, {browserClient: TestCafeBrowserClient}>}};
}>;

/**
 * Original `testController` from TestCafe.
 */
export type TestController = Inner.TestController;
