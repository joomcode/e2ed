type Command = Readonly<{
  deprecated?: boolean | undefined;
  description?: string | undefined;
  experimental?: boolean | undefined;
  name: string;
  parameters?: readonly Parameter[] | undefined;
  redirect?: string | undefined;
  returns?: readonly Parameter[] | undefined;
}>;

type Items = Readonly<{
  $ref?: string | undefined;
  type?: TypeEnum | undefined;
}>;

type Parameter = Readonly<{
  $ref?: string | undefined;
  deprecated?: boolean | undefined;
  description?: string | undefined;
  enum?: readonly string[] | undefined;
  experimental?: boolean | undefined;
  items?: Items | undefined;
  name: string;
  optional?: boolean | undefined;
  type?: TypeEnum | undefined;
}>;

type TypeElement = Readonly<{
  deprecated?: boolean | undefined;
  description?: string | undefined;
  enum?: readonly string[] | undefined;
  experimental?: boolean | undefined;
  id: string;
  items?: Items | undefined;
  properties?: readonly Parameter[] | undefined;
  type: TypeEnum;
}>;

type TypeEnum = 'any' | 'array' | 'boolean' | 'integer' | 'number' | 'object' | 'string';

export type Domain = Readonly<{
  commands: readonly Command[];
  dependencies?: readonly string[] | undefined;
  deprecated?: boolean | undefined;
  description?: string | undefined;
  domain: string;
  events?: readonly Event[] | undefined;
  experimental?: boolean | undefined;
  types?: readonly TypeElement[] | undefined;
}>;
