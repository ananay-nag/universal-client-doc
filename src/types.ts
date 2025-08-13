export interface Parameter {
  name: string;
  type: string;
  description: string;
}

export interface APIDocumentation {
  id: string;
  name: string;
  description: string;
  parameters: Parameter[];
  returnType: string;
  returnDescription: string;
  codeExample: string;
}

export interface VersionData {
  version: string;
  apis: APIDocumentation[];
}

export interface LanguageData {
  language: string;
  versions: VersionData[];
}
export interface ILanguageData {
  languageId: string;
  language: string;
  versions: IVersionData[];
}

export interface IClassExample {
  exampleId: string;
  exampleName?: string;
  description?: string[];
  codeExample?: string;
}

export interface IVersionData {
  version: string;
  versionId?: string;
  apis?: IAPIDocumentation;
}

export interface IAPIDocumentation {
  claasNames?: IClassDocumentation[];
  methods?: IMethodDocumentation[];
  id: string;
  examples?: IClassExample[];
}

export interface IClassDocumentation {
  classId: string;
  className: string;
  description: string[];
  constructor?: IConstructorDocumentation[];
  methods?: IMethodDocumentation[];
  Types?: IUniversalClientTypes[];
  example?: string;
}

export interface IMethodDocumentation {
  methodId: string;
  name: string;
  description: string[];
  parameters?: IParameter[];
  returnType?: string;
  returnDescription?: string;
  codeExample?: string;
}

export interface IUniversalClientTypes {
  typeId: string;
  typeName: string;
  description: string[];
  properties?: IParameter[];
}

export interface IConstructorDocumentation {
  constructorId: string;
  name: string;
  description: string[];
  parameters: IParameter[];
  codeExample?: string;
}

export interface IParameter {
  name: string;
  type: string;
  description: string[];
}
