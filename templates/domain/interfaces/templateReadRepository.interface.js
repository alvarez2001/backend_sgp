module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { ${entityNameCamelCase}Read } from '../entity/${entityNameLowerCase}.read';
import { Create${entityNameCamelCase}Dto } from '../../interfaces/api/dto/create-${entityNameLowerCase}.dto';
import { Update${entityNameCamelCase}Dto } from '../../interfaces/api/dto/update-${entityNameLowerCase}.dto';
import { PaginateResponseDto } from 'src/shared/interfaces/paginate-response.dto';
import { SearchCriteriaDto } from 'src/shared/interfaces/search-criteria.dto';

export const ${entityNameCamelCase.toUpperCase()}_READ_REPOSITORY_INTERFACE = '${entityNameCamelCase}ReadRepositoryInterface';

export interface ${entityNameCamelCase}ReadRepositoryInterface {
  create(${entityNameLowerCase}: Create${entityNameCamelCase}Dto): Promise<${entityNameCamelCase}Read>;

  update(id: number, ${entityNameLowerCase}: Update${entityNameCamelCase}Dto): Promise<${entityNameCamelCase}Read>;

  findById(id: number): Promise<${entityNameCamelCase}Read | null>;

  findAll(): Promise<${entityNameCamelCase}Read[]>;

  pagination(
    criteria: SearchCriteriaDto,
  ): Promise<PaginateResponseDto<${entityNameCamelCase}Read>>;

  delete(id: number): Promise<void>;
}
`;
