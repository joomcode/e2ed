import type {Feature, Scenario, StepKind} from 'parse-gherkin';

import type {Brand} from './brand';
import type {SourceFile} from './fs';
import type {ParsedTest} from './parseTest';

/**
 * Code report analyzing test and specification code, as well as the relationships between them.
 */
export type CodeReport<
  TestIdentifierKey extends string = string,
  TestIdentifierValue extends string = string,
> = Readonly<{
  durationInMs: number;
  features: Readonly<Record<SourcePath, FeatureReport>>;
  invalidFeatures: Readonly<Record<SourcePath, ParseError>>;
  invalidTests: Readonly<Record<SourcePath, ParseError>>;
  scenarios: Readonly<Record<SourcePath, ScenarioReport<TestIdentifierKey, TestIdentifierValue>>>;
  scenariosByTestIdentifier: Readonly<Record<TestIdentifierValue, SourcePath>>;
  testIdentifierKey: string;
  tests: Readonly<Record<SourcePath, TestReport<TestIdentifierKey, TestIdentifierValue>>>;
  testsByTestIdentifier: Readonly<Record<TestIdentifierValue, SourcePath>>;
}>;

/**
 * Full feature report.
 */
export type FeatureReport = Readonly<
  Omit<Feature, 'scenarios'> & {
    name: string;
    path: SourcePath;
    scenariosPaths: readonly SourcePath[];
  }
>;

/**
 * Parsing error with source.
 */
export type ParseError = Readonly<{
  error: Error;
  source: string;
}>;

/**
 * Full scenario report.
 */
export type ScenarioReport<
  TestIdentifierKey extends string = string,
  TestIdentifierValue extends string = string,
> = Readonly<
  Scenario & {
    duplicatesByTestIdentifier: readonly SourcePath[];
    errors: readonly string[];
    featurePath: SourcePath;
    indexInFeature: number;
    name: string;
    path: SourcePath;
  } & (
      | (TestIdentifierField<TestIdentifierKey, TestIdentifierValue> & {
          testIdentifier: string;
          testPath: SourcePath | undefined;
        })
      | (TestIdentifierField<TestIdentifierKey, undefined> & {
          testIdentifier: undefined;
          testPath: undefined;
        })
    )
>;

/**
 * Iterable stream of source files.
 */
export type SourceIterable = AsyncIterable<SourceFile> | Iterable<SourceFile>;

/**
 * Path to source file.
 */
export type SourcePath = Brand<string, 'SourcePath'>;

/**
 * Tokens for locating steps in tests.
 */
export type StepTokens = Readonly<Partial<Record<StepKind, string>>>;

/**
 * Step representation for the step comparison algorithm.
 * @internal
 */
export type StepWithReference = Readonly<{key: string; reference: string}>;

/**
 * Field with test identifier, if any.
 */
export type TestIdentifierField<
  TestIdentifierKey extends string,
  TestIdentifierValue extends string | undefined,
> = string extends TestIdentifierKey
  ? {}
  : Readonly<Record<TestIdentifierKey, TestIdentifierValue>>;

/**
 * Full test report.
 */
export type TestReport<
  TestIdentifierKey extends string = string,
  TestIdentifierValue extends string = string,
> = Readonly<
  ParsedTest<StepKind> & {
    duplicatesByTestIdentifier: readonly SourcePath[];
    errors: readonly string[];
    path: SourcePath;
  } & (
      | (TestIdentifierField<TestIdentifierKey, TestIdentifierValue> & {
          featurePath: SourcePath | undefined;
          scenarioPath: SourcePath | undefined;
          testIdentifier: string;
        })
      | (TestIdentifierField<TestIdentifierKey, undefined> & {
          featurePath: undefined;
          scenarioPath: undefined;
          testIdentifier: undefined;
        })
    )
>;
