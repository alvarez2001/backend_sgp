module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { Inject, Injectable } from '@nestjs/common';
import { Create${entityNameCamelCase}Dto } from '../interfaces/api/dto/create-${entityNameLowerCase}.dto';
import { Update${entityNameCamelCase}Dto } from '../interfaces/api/dto/update-${entityNameLowerCase}.dto';
import { ${entityNameCamelCase}ResponseDto } from '../interfaces/api/dto/${entityNameLowerCase}-response.dto';
import { plainToClass } from 'class-transformer';
import {
  ${entityNameCamelCase.toUpperCase()}_READ_REPOSITORY_INTERFACE,
  ${entityNameCamelCase}ReadRepositoryInterface,
} from '../domain/interfaces/${entityNameLowerCase}ReadRepository.interface';
import { PaginateResponseDto } from '../../shared/interfaces/paginate-response.dto';
import { ${entityNameCamelCase}Read } from '../domain/entity/${entityNameLowerCase}.read';
import { SearchCriteriaDto } from '../../shared/interfaces/search-criteria.dto';

@Injectable()
export class ${entityNameCamelCase}ReadService {
  constructor(
    @Inject(${entityNameCamelCase.toUpperCase()}_READ_REPOSITORY_INTERFACE)
    private ${entityNameLowerCase}Repository: ${entityNameCamelCase}ReadRepositoryInterface,
  ) {}

  async create${entityNameCamelCase}(create${entityNameCamelCase}Dto: Create${entityNameCamelCase}Dto): Promise<${entityNameCamelCase}ResponseDto> {
    const ${entityNameLowerCase} = await this.${entityNameLowerCase}Repository.create(create${entityNameCamelCase}Dto);
    return plainToClass(${entityNameCamelCase}ResponseDto, ${entityNameLowerCase}, {
      excludeExtraneousValues: true,
    });
  }

  async update${entityNameCamelCase}(
    id: number,
    update${entityNameCamelCase}Dto: Update${entityNameCamelCase}Dto,
  ): Promise<${entityNameCamelCase}ResponseDto> {
    const ${entityNameLowerCase} = await this.${entityNameLowerCase}Repository.findById(id);
    if (!${entityNameLowerCase}) {
      throw new Error('${entityNameCamelCase} not found');
    }

    const ${entityNameLowerCase}Updated = await this.${entityNameLowerCase}Repository.update(id, update${entityNameCamelCase}Dto);
    return plainToClass(${entityNameCamelCase}ResponseDto, ${entityNameLowerCase}Updated, {
      excludeExtraneousValues: true,
    });
  }

  async find${entityNameCamelCase}ById(id: number): Promise<${entityNameCamelCase}ResponseDto> {
    const ${entityNameLowerCase} = await this.${entityNameLowerCase}Repository.findById(id);

    return plainToClass(${entityNameCamelCase}ResponseDto, ${entityNameLowerCase}, {
      excludeExtraneousValues: true,
    });
  }

  async findAll${entityNameCamelCase}s(): Promise<${entityNameCamelCase}ResponseDto[]> {
    const ${entityNameLowerCase}s = await this.${entityNameLowerCase}Repository.findAll();
    return ${entityNameLowerCase}s.map((${entityNameLowerCase}) =>
      plainToClass(${entityNameCamelCase}ResponseDto, ${entityNameLowerCase}, { excludeExtraneousValues: true }),
    );
  }

  async pagination${entityNameCamelCase}s(
    criteria: SearchCriteriaDto,
  ): Promise<PaginateResponseDto<${entityNameCamelCase}ResponseDto>> {
    const pagination: PaginateResponseDto<any> =
      await this.${entityNameLowerCase}Repository.pagination(criteria);

    pagination.data = pagination.data.map((${entityNameLowerCase}: ${entityNameCamelCase}Read) => {
      return plainToClass(${entityNameCamelCase}ResponseDto, ${entityNameLowerCase}, {
        excludeExtraneousValues: true,
      });
    });

    return pagination;
  }

  async delete${entityNameCamelCase}(id: number): Promise<void> {
    return this.${entityNameLowerCase}Repository.delete(id);
  }
}
`;
