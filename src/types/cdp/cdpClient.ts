import type ProtocolMappingApi from 'devtools-protocol/types/protocol-mapping';

import type {Void} from '../undefined';
import type {Any} from '../utils';

import type {AllDomains} from './allDomains';
import type {Domain} from './domain';
import type {Target} from './target';

type AddOptParams<Type> = Readonly<{
  [Key in keyof Type]: Key extends 'on'
    ? Type[Key]
    : Type[Key] extends (...args: infer Parameters) => infer Return
      ? (...args: [...curArgs: Parameters, sessionId?: string]) => Return
      : Type[Key];
}>;

type DoEventListeners<Name extends string> = Readonly<{
  [EventName in GetEvent<Name>]: (
    listener: (params: GetReturnType<Name, EventName>, sessionId?: string) => void,
  ) => () => CdpClient;
}>;

type DoEventObj<Name> = Name extends string ? DoEventPromises<Name> & DoEventListeners<Name> : {};

type DoEventPromises<Name extends string> = Readonly<{
  [EventName in GetEvent<Name>]: () => Promise<
    GetReturnType<Name, EventName> extends undefined ? Void : GetReturnType<Name, EventName>
  >;
}>;

type EventCallbacks<Type extends ProtocolMappingApi.Events> = Readonly<{
  [Property in keyof Type]: (
    callback: (
      params: Type[Property] extends [Any] ? Type[Property][0] : undefined,
      sessionId?: string,
    ) => void,
  ) => () => CdpClient;
}>;

type EventMessage = Readonly<{
  method: string;
  params: object;
  sessionId?: string | undefined;
}>;

// '<domain>.<event>' i.e. Page.loadEventFired
type EventPromises<Type extends ProtocolMappingApi.Events> = Readonly<{
  [Property in keyof Type]: () => Type[Property] extends [Any]
    ? Promise<Type[Property][0]>
    : Promise<void>;
}>;

type GetEvent<Name extends string> = GetEventFromString<Name, keyof ProtocolMappingApi.Events>;

type GetEventFromString<
  Name extends string,
  Str extends string,
> = Str extends `${Name}.${infer EventName}` ? EventName : never;

type GetReturnType<
  Name extends string,
  EventName extends string,
> = `${Name}.${EventName}` extends keyof ProtocolMappingApi.Events
  ? ProtocolMappingApi.Events[`${Name}.${EventName}`][0]
  : never;

type ImproveApi<Type> = Readonly<{
  [Key in keyof Type]: DoEventObj<Key> & AddOptParams<OptIfParamNullable<Type[Key]>>;
}>;

type IsNullableObj<Type> = Record<keyof Type, undefined> extends Type ? true : false;

/**
 * Checks whether the only parameter of `Type[Key]` is nullable i.e. all of
 * its properties are optional, and makes it optional if so.
 */
type OptIfParamNullable<Type> = Readonly<{
  [Key in keyof Type]: Type[Key] extends (params: Any) => Any
    ? IsNullableObj<Parameters<Type[Key]>[0]> extends true
      ? (params?: Parameters<Type[Key]>[0]) => ReturnType<Type[Key]>
      : Type[Key]
    : Type[Key];
}>;

type SendCallback<Type extends keyof ProtocolMappingApi.Commands> = Readonly<{
  (error: true, response: SendError): void;
  (error: false, response: ProtocolMappingApi.Commands[Type]['returnType']): void;
  (error: Error, response: undefined): void;
}>;

type SendError = Readonly<{code: number; data?: string | undefined; message: string}>;

/**
 * CDP client from package `chrome-remote-interface`.
 * {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chrome-remote-interface/index.d.ts}
 * @internal
 */
export type CdpClient = Readonly<{
  alterPath: ((path: string) => string) | undefined;
  close: () => Promise<void>;
  host: string;
  local: boolean;
  on(event: 'event', callback: (message: EventMessage) => void): void;
  on(event: 'disconnect' | 'ready', callback: () => void): void;
  // '<domain>.<method>' i.e. Network.requestWillBeSent
  on<T extends keyof ProtocolMappingApi.Events>(
    event: T,
    callback: (params: ProtocolMappingApi.Events[T][0], sessionId?: string) => void,
  ): void;
  // '<domain>.<method>.<sessionId>' i.e. Network.requestWillBeSent.abc123
  on(event: string, callback: (params: object, sessionId?: string) => void): void;
  port: number;
  protocol: Readonly<{
    domains: readonly Domain[];
    version: Readonly<{major: string; minor: string}>;
  }>;
  secure: boolean;
  // client.send(method, [params], [sessionId], [callback])
  send<T extends keyof ProtocolMappingApi.Commands>(event: T, callback: SendCallback<T>): void;
  send<T extends keyof ProtocolMappingApi.Commands>(
    event: T,
    params: ProtocolMappingApi.Commands[T]['paramsType'][0],
    callback: SendCallback<T>,
  ): void;
  send<T extends keyof ProtocolMappingApi.Commands>(
    event: T,
    params: ProtocolMappingApi.Commands[T]['paramsType'][0],
    sessionId: string,
    callback: SendCallback<T>,
  ): void;
  send<T extends keyof ProtocolMappingApi.Commands>(
    event: T,
    params?: ProtocolMappingApi.Commands[T]['paramsType'][0],
    sessionId?: string,
  ): Promise<ProtocolMappingApi.Commands[T]['returnType']>;
  target: Target | string | ((targets: readonly Target[]) => Target | number) | undefined;
  useHostName: boolean;
  webSocketUrl: string;
}> &
  EventPromises<ProtocolMappingApi.Events> &
  EventCallbacks<ProtocolMappingApi.Events> &
  ImproveApi<AllDomains>;
