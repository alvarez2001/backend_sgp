import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectService } from '../../application/project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { Public } from '@shared/infrastructure/decorators/public.decorator';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    @Public()
    async create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectResponseDto> {
        return this.projectService.createProject(createProjectDto);
    }

    @Get(':id')
    @ApiBearerAuth()
    async findOne(@Param('id') id: number): Promise<ProjectResponseDto> {
        return this.projectService.findProjectById(id);
    }

    @Get()
    @ApiBearerAuth()
    async pagination(@Query() query: object): Promise<PaginateResponseDto<ProjectResponseDto>> {
        return this.projectService.pagination(query);
    }

    @Get('/data/list')
    @ApiBearerAuth()
    async findAll(): Promise<ProjectResponseDto[]> {
        return this.projectService.findAllProjects();
    }

    @Put(':id')
    @ApiBearerAuth()
    async update(
        @Param('id') id: number,
        @Body() updateProjectDto: UpdateProjectDto,
    ): Promise<ProjectResponseDto> {
        return this.projectService.updateProject(id, updateProjectDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    async remove(@Param('id') id: number): Promise<void> {
        return this.projectService.deleteProject(id);
    }
}
