module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { Injectable } from '@nestjs/common';
import { ${entityNameCamelCase}ReadRepositoryInterface } from '../../domain/interfaces/${entityNameLowerCase}ReadRepository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ${entityNameCamelCase}Read, ${entityNameCamelCase}ReadDocument } from '../../domain/entity/${entityNameLowerCase}.read';
import { Model } from 'mongoose';
import { Create${entityNameCamelCase}Dto } from '../../interfaces/api/dto/create-${entityNameLowerCase}.dto';
import { Update${entityNameCamelCase}Dto } from '../../interfaces/api/dto/update-${entityNameLowerCase}.dto';
import { BaseReadRepository } from 'src/shared/infrastructure/repository/base.read.repository';
import { PaginateResponseDto } from 'src/shared/interfaces/paginate-response.dto';
import { SearchCriteriaDto } from 'src/shared/interfaces/search-criteria.dto';

@Injectable()
export class ${entityNameCamelCase}ReadRepository
  extends BaseReadRepository<${entityNameCamelCase}Read>
  implements ${entityNameCamelCase}ReadRepositoryInterface
{
  constructor(
    @InjectModel(${entityNameCamelCase}Read.name)
    private readonly ${entityNameLowerCase}ReadModel: Model<${entityNameCamelCase}ReadDocument>,
  ) {
    super();
  }

  async create(${entityNameLowerCase}: Create${entityNameCamelCase}Dto): Promise<${entityNameCamelCase}Read> {
    return this.${entityNameLowerCase}ReadModel.create(${entityNameLowerCase});
  }

  async findById(id: number): Promise<${entityNameCamelCase}Read | null> {
    return this.${entityNameLowerCase}ReadModel.findOne({ id }).exec();
  }

  async findAll(): Promise<${entityNameCamelCase}Read[]> {
    return this.${entityNameLowerCase}ReadModel.find().exec();
  }

  async pagination(
    criteria: SearchCriteriaDto,
  ): Promise<PaginateResponseDto<${entityNameCamelCase}Read>> {
    return this.findByCriteria(this.${entityNameLowerCase}ReadModel, criteria);
  }

  async update(id: number, ${entityNameLowerCase}: Update${entityNameCamelCase}Dto): Promise<${entityNameCamelCase}Read> {
    await this.${entityNameLowerCase}ReadModel.updateOne({ id }, ${entityNameLowerCase}).exec();
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.${entityNameLowerCase}ReadModel.deleteOne({ id });
  }
}
`;
