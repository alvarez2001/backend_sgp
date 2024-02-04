module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { Inject, Injectable } from '@nestjs/common';
import {
  ${entityNameLowerCase.toUpperCase()}_REPOSITORY_INTERFACE,
  ${entityNameCamelCase}RepositoryInterface,
} from '../domain/interfaces/${entityNameLowerCase}Repository.interface';
import { ${entityNameCamelCase} } from '../domain/entity/${entityNameLowerCase}.entity';
import { Create${entityNameCamelCase}Dto } from '../interfaces/api/dto/create-${entityNameLowerCase}.dto';
import { Update${entityNameCamelCase}Dto } from '../interfaces/api/dto/update-${entityNameLowerCase}.dto';
import { ${entityNameCamelCase}ResponseDto } from '../interfaces/api/dto/${entityNameLowerCase}-response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ${entityNameCamelCase}Service {
  constructor(
    @Inject(${entityNameLowerCase.toUpperCase()}_REPOSITORY_INTERFACE)
    private ${entityNameLowerCase}Repository: ${entityNameCamelCase}RepositoryInterface,
  ) {}

  async create${entityNameCamelCase}(create${entityNameCamelCase}Dto: Create${entityNameCamelCase}Dto): Promise<${entityNameCamelCase}ResponseDto> {
    const ${entityNameLowerCase} = new ${entityNameCamelCase}();
    Object.assign(${entityNameLowerCase}, create${entityNameCamelCase}Dto);
    await this.${entityNameLowerCase}Repository.create(${entityNameLowerCase});
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
    Object.assign(${entityNameLowerCase}, update${entityNameCamelCase}Dto);
    await this.${entityNameLowerCase}Repository.update(id, ${entityNameLowerCase});
    return plainToClass(${entityNameCamelCase}ResponseDto, ${entityNameLowerCase}, {
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

  async delete${entityNameCamelCase}(id: number): Promise<void> {
    return this.${entityNameLowerCase}Repository.delete(id);
  }
}
`;
