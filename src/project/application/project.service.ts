import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
    PROJECT_REPOSITORY_INTERFACE,
    ProjectRepositoryInterface,
} from '../domain/interfaces/projectRepository.interface';
import { Project } from '../domain/entity/project.entity';
import { CreateProjectDto } from '../interfaces/api/dto/create-project.dto';
import { UpdateProjectDto } from '../interfaces/api/dto/update-project.dto';
import { ProjectResponseDto } from '../interfaces/api/dto/project-response.dto';
import { plainToClass } from 'class-transformer';
import * as bcryptjs from 'bcryptjs';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';

@Injectable()
export class ProjectService {
    constructor(
        @Inject(PROJECT_REPOSITORY_INTERFACE)
        private projectRepository: ProjectRepositoryInterface,
    ) {}

    async createProject(createProjectDto: CreateProjectDto): Promise<ProjectResponseDto> {
        const project = new Project();
        Object.assign(project, createProjectDto);
        await this.projectRepository.create(project);
        return plainToClass(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }

    async updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<ProjectResponseDto> {
        const project = await this.projectRepository.findById(id);
        if (!project) {
            throw new Error('Project not found');
        }
        Object.assign(project, updateProjectDto);

        await this.projectRepository.update(id, project);
        return plainToClass(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }

    async findProjectById(id: number): Promise<ProjectResponseDto> {
        const project = await this.projectRepository.findById(id);

        return plainToClass(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }

    async findAllProjects(): Promise<ProjectResponseDto[]> {
        const projects = await this.projectRepository.findAll();
        return projects.map(project =>
            plainToClass(ProjectResponseDto, project, {
                excludeExtraneousValues: true,
            }),
        );
    }

    async deleteProject(id: number): Promise<void> {
        return this.projectRepository.delete(id);
    }

    async pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectResponseDto>> {
        const pagination: PaginateResponseDto<Project> =
            await this.projectRepository.pagination(criteria);

        const paginationResponse: PaginateResponseDto<ProjectResponseDto> = {
            ...pagination,
            data: [],
        };

        paginationResponse.data = pagination.data.map((project: Project) => {
            return plainToClass(ProjectResponseDto, project, {
                excludeExtraneousValues: true,
            });
        });

        return paginationResponse;
    }
}
