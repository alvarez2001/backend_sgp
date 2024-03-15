import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
    PROJECTEXPENSEREQUEST_REPOSITORY_INTERFACE,
    ProjectExpenseRequestRepositoryInterface,
} from '../domain/interfaces/projectexpenserequestRepository.interface';
import { ProjectExpenseRequest } from '../domain/entity/projectexpenserequest.entity';
import { CreateProjectExpenseRequestDto } from '../interfaces/api/dto/create-projectexpenserequest.dto';
import { UpdateProjectExpenseRequestDto } from '../interfaces/api/dto/update-projectexpenserequest.dto';
import { ProjectExpenseRequestResponseDto } from '../interfaces/api/dto/projectexpenserequest-response.dto';
import { plainToClass } from 'class-transformer';
import * as bcryptjs from 'bcryptjs';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';

@Injectable()
export class ProjectExpenseRequestService {
    constructor(
        @Inject(PROJECTEXPENSEREQUEST_REPOSITORY_INTERFACE)
        private projectexpenserequestRepository: ProjectExpenseRequestRepositoryInterface,
    ) {}

    async createProjectExpenseRequest(createProjectExpenseRequestDto: CreateProjectExpenseRequestDto): Promise<ProjectExpenseRequestResponseDto> {
        const projectexpenserequest = new ProjectExpenseRequest();
        Object.assign(projectexpenserequest, createProjectExpenseRequestDto);
        await this.projectexpenserequestRepository.create(projectexpenserequest);
        return plainToClass(ProjectExpenseRequestResponseDto, projectexpenserequest, {
            excludeExtraneousValues: true,
        });
    }

    async updateProjectExpenseRequest(id: number, updateProjectExpenseRequestDto: UpdateProjectExpenseRequestDto): Promise<ProjectExpenseRequestResponseDto> {
        const projectexpenserequest = await this.projectexpenserequestRepository.findById(id);
        if (!projectexpenserequest) {
            throw new Error('ProjectExpenseRequest not found');
        }
        Object.assign(projectexpenserequest, updateProjectExpenseRequestDto);

        await this.projectexpenserequestRepository.update(id, projectexpenserequest);
        return plainToClass(ProjectExpenseRequestResponseDto, projectexpenserequest, {
            excludeExtraneousValues: true,
        });
    }

    async findProjectExpenseRequestById(id: number): Promise<ProjectExpenseRequestResponseDto> {
        const projectexpenserequest = await this.projectexpenserequestRepository.findById(id);

        return plainToClass(ProjectExpenseRequestResponseDto, projectexpenserequest, {
            excludeExtraneousValues: true,
        });
    }

    async findAllProjectExpenseRequests(): Promise<ProjectExpenseRequestResponseDto[]> {
        const projectexpenserequests = await this.projectexpenserequestRepository.findAll();
        return projectexpenserequests.map(projectexpenserequest =>
            plainToClass(ProjectExpenseRequestResponseDto, projectexpenserequest, {
                excludeExtraneousValues: true,
            }),
        );
    }

    async deleteProjectExpenseRequest(id: number): Promise<void> {
        return this.projectexpenserequestRepository.delete(id);
    }

    async pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectExpenseRequestResponseDto>> {
        const pagination: PaginateResponseDto<ProjectExpenseRequest> =
            await this.projectexpenserequestRepository.pagination(criteria);

        const paginationResponse: PaginateResponseDto<ProjectExpenseRequestResponseDto> = {
            ...pagination,
            data: [],
        };

        paginationResponse.data = pagination.data.map((projectexpenserequest: ProjectExpenseRequest) => {
            return plainToClass(ProjectExpenseRequestResponseDto, projectexpenserequest, {
                excludeExtraneousValues: true,
            });
        });

        return paginationResponse;
    }
}
