module.exports = (entityNameLowerCase, entityNameCamelCase) => `import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ${entityNameCamelCase}Service } from '../../application/${entityNameLowerCase}.service';
import { Create${entityNameCamelCase}Dto } from './dto/create-${entityNameLowerCase}.dto';
import { Update${entityNameCamelCase}Dto } from './dto/update-${entityNameLowerCase}.dto';
import { ${entityNameCamelCase}ResponseDto } from './dto/${entityNameLowerCase}-response.dto';
import { ${entityNameCamelCase}ReadService } from '../../application/${entityNameLowerCase}.read.service';
import { PaginateResponseDto } from '../../../shared/interfaces/paginate-response.dto';

@ApiTags('${entityNameLowerCase}s')
@Controller('${entityNameLowerCase}s')
export class ${entityNameCamelCase}Controller {
  constructor(
    private readonly ${entityNameLowerCase}Service: ${entityNameCamelCase}Service,
    private readonly ${entityNameLowerCase}ReadService: ${entityNameCamelCase}ReadService,
  ) {}

  @Post()
  async create(@Body() create${entityNameCamelCase}Dto: Create${entityNameCamelCase}Dto): Promise<${entityNameCamelCase}ResponseDto> {
    return this.${entityNameLowerCase}Service.create${entityNameCamelCase}(create${entityNameCamelCase}Dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<${entityNameCamelCase}ResponseDto> {
    return this.${entityNameLowerCase}ReadService.find${entityNameCamelCase}ById(id);
  }

  @Get()
  async pagination(
    @Query() query: any,
  ): Promise<PaginateResponseDto<${entityNameCamelCase}ResponseDto>> {
    return this.${entityNameLowerCase}ReadService.pagination${entityNameCamelCase}s(query);
  }

  @Get('/data/list')
  async findAll(): Promise<${entityNameCamelCase}ResponseDto[]> {
    return this.${entityNameLowerCase}ReadService.findAll${entityNameCamelCase}s();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() update${entityNameCamelCase}Dto: Update${entityNameCamelCase}Dto,
  ): Promise<${entityNameCamelCase}ResponseDto> {
    return this.${entityNameLowerCase}Service.update${entityNameCamelCase}(id, update${entityNameCamelCase}Dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.${entityNameLowerCase}Service.delete${entityNameCamelCase}(id);
  }
}
`;
