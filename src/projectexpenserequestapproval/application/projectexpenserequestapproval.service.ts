import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
    PROJECTEXPENSEREQUESTAPPROVAL_REPOSITORY_INTERFACE,
    ProjectExpenseRequestApprovalRepositoryInterface,
} from '../domain/interfaces/projectexpenserequestapprovalRepository.interface';
import { ProjectExpenseRequestApproval } from '../domain/entity/projectexpenserequestapproval.entity';
import { CreateProjectExpenseRequestApprovalDto } from '../interfaces/api/dto/create-projectexpenserequestapproval.dto';
import { UpdateProjectExpenseRequestApprovalDto } from '../interfaces/api/dto/update-projectexpenserequestapproval.dto';
import { ProjectExpenseRequestApprovalResponseDto } from '../interfaces/api/dto/projectexpenserequestapproval-response.dto';
import { plainToClass } from 'class-transformer';
import * as bcryptjs from 'bcryptjs';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';

@Injectable()
export class ProjectExpenseRequestApprovalService {
    constructor(
        @Inject(PROJECTEXPENSEREQUESTAPPROVAL_REPOSITORY_INTERFACE)
        private projectexpenserequestapprovalRepository: ProjectExpenseRequestApprovalRepositoryInterface,
    ) {}

    async createProjectExpenseRequestApproval(createProjectExpenseRequestApprovalDto: CreateProjectExpenseRequestApprovalDto): Promise<ProjectExpenseRequestApprovalResponseDto> {
        const projectexpenserequestapproval = new ProjectExpenseRequestApproval();
        Object.assign(projectexpenserequestapproval, createProjectExpenseRequestApprovalDto);
        await this.projectexpenserequestapprovalRepository.create(projectexpenserequestapproval);
        return plainToClass(ProjectExpenseRequestApprovalResponseDto, projectexpenserequestapproval, {
            excludeExtraneousValues: true,
        });
    }

    async updateProjectExpenseRequestApproval(id: number, updateProjectExpenseRequestApprovalDto: UpdateProjectExpenseRequestApprovalDto): Promise<ProjectExpenseRequestApprovalResponseDto> {
        const projectexpenserequestapproval = await this.projectexpenserequestapprovalRepository.findById(id);
        if (!projectexpenserequestapproval) {
            throw new Error('ProjectExpenseRequestApproval not found');
        }
        Object.assign(projectexpenserequestapproval, updateProjectExpenseRequestApprovalDto);

        await this.projectexpenserequestapprovalRepository.update(id, projectexpenserequestapproval);
        return plainToClass(ProjectExpenseRequestApprovalResponseDto, projectexpenserequestapproval, {
            excludeExtraneousValues: true,
        });
    }

    async findProjectExpenseRequestApprovalById(id: number): Promise<ProjectExpenseRequestApprovalResponseDto> {
        const projectexpenserequestapproval = await this.projectexpenserequestapprovalRepository.findById(id);

        return plainToClass(ProjectExpenseRequestApprovalResponseDto, projectexpenserequestapproval, {
            excludeExtraneousValues: true,
        });
    }

    async findAllProjectExpenseRequestApprovals(): Promise<ProjectExpenseRequestApprovalResponseDto[]> {
        const projectexpenserequestapprovals = await this.projectexpenserequestapprovalRepository.findAll();
        return projectexpenserequestapprovals.map(projectexpenserequestapproval =>
            plainToClass(ProjectExpenseRequestApprovalResponseDto, projectexpenserequestapproval, {
                excludeExtraneousValues: true,
            }),
        );
    }

    async deleteProjectExpenseRequestApproval(id: number): Promise<void> {
        return this.projectexpenserequestapprovalRepository.delete(id);
    }

    async pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectExpenseRequestApprovalResponseDto>> {
        const pagination: PaginateResponseDto<ProjectExpenseRequestApproval> =
            await this.projectexpenserequestapprovalRepository.pagination(criteria);

        const paginationResponse: PaginateResponseDto<ProjectExpenseRequestApprovalResponseDto> = {
            ...pagination,
            data: [],
        };

        paginationResponse.data = pagination.data.map((projectexpenserequestapproval: ProjectExpenseRequestApproval) => {
            return plainToClass(ProjectExpenseRequestApprovalResponseDto, projectexpenserequestapproval, {
                excludeExtraneousValues: true,
            });
        });

        return paginationResponse;
    }
}
