/**
 * Generic class type by constructor arguments, prototype and static part.
 */
export type Class<
  ConstructorArgs extends readonly unknown[] = readonly unknown[],
  Prototype extends object = object,
  Static extends object = object,
> = {
  new (...args: ConstructorArgs): Prototype;
  readonly prototype: Prototype;
} & Static;
