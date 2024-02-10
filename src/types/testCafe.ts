import type {Inner} from 'testcafe-without-typecheck';

import type {Brand} from './brand';
import type {CdpClient} from './cdp';
import type {DeepReadonly} from './deep';

/**
 * TestCafe browser client.
 * @internal
 */
type TestCafeBrowserClient = DeepReadonly<{
  _clientKey: TestCafeBrowserClientKey;
  _clients: Record<TestCafeBrowserClientKey, {client: CdpClient; inactive: boolean}>;
}>;

/**
 * Key of TestCafe browser client.
 * @internal
 */
type TestCafeBrowserClientKey = Brand<string, 'TestCafeBrowserClientKey'>;

/**
 * Original instance of `TestCafe` (used directly to run tests through a JavaScript API).
 * @internal
 */
export type TestCafeInstance = Inner.TestCafe;

/**
 * Original selector from TestCafe.
 */
export type TestCafeSelector = Inner.Selector;

/**
 * TestCafe browser connection.
 * @internal
 */
export type TestCafeBrowserConnection = DeepReadonly<{
  id: TestCafeBrowserConnectionId;
  provider: {
    plugin: {
      openedBrowsers: Record<TestCafeBrowserConnectionId, {browserClient: TestCafeBrowserClient}>;
    };
  };
}> &
  NodeJS.EventEmitter;

/**
 * Id of TestCafe browser connection.
 * @internal
 */
export type TestCafeBrowserConnectionId = Brand<string, 'TestCafeBrowserConnectionId'>;

/**
 * Original `testController` from TestCafe.
 */
export type TestController = Inner.TestController;
