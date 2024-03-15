import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectExpenseRequestProductService } from '../../application/projectexpenserequestproduct.service';
import { CreateProjectExpenseRequestProductDto } from './dto/create-projectexpenserequestproduct.dto';
import { UpdateProjectExpenseRequestProductDto } from './dto/update-projectexpenserequestproduct.dto';
import { ProjectExpenseRequestProductResponseDto } from './dto/projectexpenserequestproduct-response.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { Public } from '@shared/infrastructure/decorators/public.decorator';

@ApiTags('projectexpenserequestproducts')
@Controller('projectexpenserequestproducts')
export class ProjectExpenseRequestProductController {
    constructor(private readonly projectexpenserequestproductService: ProjectExpenseRequestProductService) {}

    @Post()
    @Public()
    async create(@Body() createProjectExpenseRequestProductDto: CreateProjectExpenseRequestProductDto): Promise<ProjectExpenseRequestProductResponseDto> {
        return this.projectexpenserequestproductService.createProjectExpenseRequestProduct(createProjectExpenseRequestProductDto);
    }

    @Get(':id')
    @ApiBearerAuth()
    async findOne(@Param('id') id: number): Promise<ProjectExpenseRequestProductResponseDto> {
        return this.projectexpenserequestproductService.findProjectExpenseRequestProductById(id);
    }

    @Get()
    @ApiBearerAuth()
    async pagination(@Query() query: object): Promise<PaginateResponseDto<ProjectExpenseRequestProductResponseDto>> {
        return this.projectexpenserequestproductService.pagination(query);
    }

    @Get('/data/list')
    @ApiBearerAuth()
    async findAll(): Promise<ProjectExpenseRequestProductResponseDto[]> {
        return this.projectexpenserequestproductService.findAllProjectExpenseRequestProducts();
    }

    @Put(':id')
    @ApiBearerAuth()
    async update(
        @Param('id') id: number,
        @Body() updateProjectExpenseRequestProductDto: UpdateProjectExpenseRequestProductDto,
    ): Promise<ProjectExpenseRequestProductResponseDto> {
        return this.projectexpenserequestproductService.updateProjectExpenseRequestProduct(id, updateProjectExpenseRequestProductDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    async remove(@Param('id') id: number): Promise<void> {
        return this.projectexpenserequestproductService.deleteProjectExpenseRequestProduct(id);
    }
}
