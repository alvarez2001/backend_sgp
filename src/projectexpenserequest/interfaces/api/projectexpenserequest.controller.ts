import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectExpenseRequestService } from '../../application/projectexpenserequest.service';
import { CreateProjectExpenseRequestDto } from './dto/create-projectexpenserequest.dto';
import { UpdateProjectExpenseRequestDto } from './dto/update-projectexpenserequest.dto';
import { ProjectExpenseRequestResponseDto } from './dto/projectexpenserequest-response.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { Public } from '@shared/infrastructure/decorators/public.decorator';

@ApiTags('projectexpenserequests')
@Controller('projectexpenserequests')
export class ProjectExpenseRequestController {
    constructor(private readonly projectexpenserequestService: ProjectExpenseRequestService) {}

    @Post()
    @Public()
    async create(@Body() createProjectExpenseRequestDto: CreateProjectExpenseRequestDto): Promise<ProjectExpenseRequestResponseDto> {
        return this.projectexpenserequestService.createProjectExpenseRequest(createProjectExpenseRequestDto);
    }

    @Get(':id')
    @ApiBearerAuth()
    async findOne(@Param('id') id: number): Promise<ProjectExpenseRequestResponseDto> {
        return this.projectexpenserequestService.findProjectExpenseRequestById(id);
    }

    @Get()
    @ApiBearerAuth()
    async pagination(@Query() query: object): Promise<PaginateResponseDto<ProjectExpenseRequestResponseDto>> {
        return this.projectexpenserequestService.pagination(query);
    }

    @Get('/data/list')
    @ApiBearerAuth()
    async findAll(): Promise<ProjectExpenseRequestResponseDto[]> {
        return this.projectexpenserequestService.findAllProjectExpenseRequests();
    }

    @Put(':id')
    @ApiBearerAuth()
    async update(
        @Param('id') id: number,
        @Body() updateProjectExpenseRequestDto: UpdateProjectExpenseRequestDto,
    ): Promise<ProjectExpenseRequestResponseDto> {
        return this.projectexpenserequestService.updateProjectExpenseRequest(id, updateProjectExpenseRequestDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    async remove(@Param('id') id: number): Promise<void> {
        return this.projectexpenserequestService.deleteProjectExpenseRequest(id);
    }
}
