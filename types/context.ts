export type TestMeta = Readonly<{
  runId?: string;
}>;

export type FullContext = Readonly<{
  meta: TestMeta;
}>;
