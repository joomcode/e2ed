import type ProtocolProxyApi from 'devtools-protocol/types/protocol-proxy-api';

type DeprecatedDomains = Readonly<{
  /** @deprecated This domain is deprecated - use Runtime or Log instead. */
  Console: ProtocolProxyApi.ConsoleApi;
  /** @deprecated This domain is deprecated. */
  Schema: ProtocolProxyApi.SchemaApi;
}>;

type ExperimentalDomains = Readonly<{
  /** @deprecated this API is experimental. */
  Accessibility: ProtocolProxyApi.AccessibilityApi;
  /** @deprecated this API is experimental. */
  Animation: ProtocolProxyApi.AnimationApi;
  /** @deprecated this API is experimental. */
  Audits: ProtocolProxyApi.AuditsApi;
  /** @deprecated this API is experimental. */
  BackgroundService: ProtocolProxyApi.BackgroundServiceApi;
  /** @deprecated this API is experimental. */
  CacheStorage: ProtocolProxyApi.CacheStorageApi;
  /** @deprecated this API is experimental. */
  Cast: ProtocolProxyApi.CastApi;
  /** @deprecated this API is experimental. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DOMSnapshot: ProtocolProxyApi.DOMSnapshotApi;
  /** @deprecated this API is experimental. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DOMStorage: ProtocolProxyApi.DOMStorageApi;
  /** @deprecated this API is experimental. */
  Database: ProtocolProxyApi.DatabaseApi;
  /** @deprecated this API is experimental. */
  DeviceOrientation: ProtocolProxyApi.DeviceOrientationApi;
  /** @deprecated this API is experimental. */
  Fetch: ProtocolProxyApi.FetchApi;
  /** @deprecated this API is experimental. */
  HeadlessExperimental: ProtocolProxyApi.HeadlessExperimentalApi;
  /** @deprecated this API is experimental. */
  HeapProfiler: ProtocolProxyApi.HeapProfilerApi;
  /** @deprecated this API is experimental. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IndexedDB: ProtocolProxyApi.IndexedDBApi;
  /** @deprecated this API is experimental. */
  Inspector: ProtocolProxyApi.InspectorApi;
  /** @deprecated this API is experimental. */
  LayerTree: ProtocolProxyApi.LayerTreeApi;
  /** @deprecated this API is experimental. */
  Media: ProtocolProxyApi.MediaApi;
  /** @deprecated this API is experimental. */
  Memory: ProtocolProxyApi.MemoryApi;
  /** @deprecated this API is experimental. */
  Overlay: ProtocolProxyApi.OverlayApi;
  /** @deprecated this API is experimental. */
  ServiceWorker: ProtocolProxyApi.ServiceWorkerApi;
  /** @deprecated this API is experimental. */
  Storage: ProtocolProxyApi.StorageApi;
  /** @deprecated this API is experimental. */
  SystemInfo: ProtocolProxyApi.SystemInfoApi;
  /** @deprecated this API is experimental. */
  Tethering: ProtocolProxyApi.TetheringApi;
  /** @deprecated this API is experimental. */
  Tracing: ProtocolProxyApi.TracingApi;
  /** @deprecated this API is experimental. */
  WebAudio: ProtocolProxyApi.WebAudioApi;
  /** @deprecated this API is experimental. */
  WebAuthn: ProtocolProxyApi.WebAuthnApi;
}>;

type StableDomains = Readonly<{
  Browser: ProtocolProxyApi.BrowserApi;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CSS: ProtocolProxyApi.CSSApi;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DOM: ProtocolProxyApi.DOMApi;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DOMDebugger: ProtocolProxyApi.DOMDebuggerApi;
  Debugger: ProtocolProxyApi.DebuggerApi;
  Emulation: ProtocolProxyApi.EmulationApi;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IO: ProtocolProxyApi.IOApi;
  Input: ProtocolProxyApi.InputApi;
  Log: ProtocolProxyApi.LogApi;
  Network: ProtocolProxyApi.NetworkApi;
  Page: ProtocolProxyApi.PageApi;
  Performance: ProtocolProxyApi.PerformanceApi;
  Profiler: ProtocolProxyApi.ProfilerApi;
  Runtime: ProtocolProxyApi.RuntimeApi;
  Security: ProtocolProxyApi.SecurityApi;
  Target: ProtocolProxyApi.TargetApi;
}>;

export type AllDomains = StableDomains & DeprecatedDomains & ExperimentalDomains;
