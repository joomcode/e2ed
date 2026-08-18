/**
 * Common static project settings (general for all packs).
 */
export type ProjectSettings = Readonly<{
  allTestFileGlobs: readonly string[];
  dockerImage: string | null;
  pathToTsConfigFromRoot: string;
  testIdentifierKey: Readonly<Record<string, string>>;
}>;
