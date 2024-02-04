module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { ${entityNameCamelCase} } from '../entity/${entityNameLowerCase}.entity';

export const ${entityNameCamelCase.toUpperCase()}_REPOSITORY_INTERFACE = '${entityNameCamelCase}RepositoryInterface';
export interface ${entityNameCamelCase}RepositoryInterface {
  create(${entityNameLowerCase}: ${entityNameCamelCase}): Promise<${entityNameCamelCase}>;

  update(id: number, ${entityNameLowerCase}: Partial<${entityNameCamelCase}>): Promise<${entityNameCamelCase}>;

  findById(id: number): Promise<${entityNameCamelCase} | null>;

  findAll(): Promise<${entityNameCamelCase}[]>;

  delete(id: number): Promise<void>;
}
`;
