import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
    PROJECTEXPENSEREQUESTPRODUCT_REPOSITORY_INTERFACE,
    ProjectExpenseRequestProductRepositoryInterface,
} from '../domain/interfaces/projectexpenserequestproductRepository.interface';
import { ProjectExpenseRequestProduct } from '../domain/entity/projectexpenserequestproduct.entity';
import { CreateProjectExpenseRequestProductDto } from '../interfaces/api/dto/create-projectexpenserequestproduct.dto';
import { UpdateProjectExpenseRequestProductDto } from '../interfaces/api/dto/update-projectexpenserequestproduct.dto';
import { ProjectExpenseRequestProductResponseDto } from '../interfaces/api/dto/projectexpenserequestproduct-response.dto';
import { plainToClass } from 'class-transformer';
import * as bcryptjs from 'bcryptjs';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';

@Injectable()
export class ProjectExpenseRequestProductService {
    constructor(
        @Inject(PROJECTEXPENSEREQUESTPRODUCT_REPOSITORY_INTERFACE)
        private projectexpenserequestproductRepository: ProjectExpenseRequestProductRepositoryInterface,
    ) {}

    async createProjectExpenseRequestProduct(createProjectExpenseRequestProductDto: CreateProjectExpenseRequestProductDto): Promise<ProjectExpenseRequestProductResponseDto> {
        const projectexpenserequestproduct = new ProjectExpenseRequestProduct();
        Object.assign(projectexpenserequestproduct, createProjectExpenseRequestProductDto);
        await this.projectexpenserequestproductRepository.create(projectexpenserequestproduct);
        return plainToClass(ProjectExpenseRequestProductResponseDto, projectexpenserequestproduct, {
            excludeExtraneousValues: true,
        });
    }

    async updateProjectExpenseRequestProduct(id: number, updateProjectExpenseRequestProductDto: UpdateProjectExpenseRequestProductDto): Promise<ProjectExpenseRequestProductResponseDto> {
        const projectexpenserequestproduct = await this.projectexpenserequestproductRepository.findById(id);
        if (!projectexpenserequestproduct) {
            throw new Error('ProjectExpenseRequestProduct not found');
        }
        Object.assign(projectexpenserequestproduct, updateProjectExpenseRequestProductDto);

        await this.projectexpenserequestproductRepository.update(id, projectexpenserequestproduct);
        return plainToClass(ProjectExpenseRequestProductResponseDto, projectexpenserequestproduct, {
            excludeExtraneousValues: true,
        });
    }

    async findProjectExpenseRequestProductById(id: number): Promise<ProjectExpenseRequestProductResponseDto> {
        const projectexpenserequestproduct = await this.projectexpenserequestproductRepository.findById(id);

        return plainToClass(ProjectExpenseRequestProductResponseDto, projectexpenserequestproduct, {
            excludeExtraneousValues: true,
        });
    }

    async findAllProjectExpenseRequestProducts(): Promise<ProjectExpenseRequestProductResponseDto[]> {
        const projectexpenserequestproducts = await this.projectexpenserequestproductRepository.findAll();
        return projectexpenserequestproducts.map(projectexpenserequestproduct =>
            plainToClass(ProjectExpenseRequestProductResponseDto, projectexpenserequestproduct, {
                excludeExtraneousValues: true,
            }),
        );
    }

    async deleteProjectExpenseRequestProduct(id: number): Promise<void> {
        return this.projectexpenserequestproductRepository.delete(id);
    }

    async pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectExpenseRequestProductResponseDto>> {
        const pagination: PaginateResponseDto<ProjectExpenseRequestProduct> =
            await this.projectexpenserequestproductRepository.pagination(criteria);

        const paginationResponse: PaginateResponseDto<ProjectExpenseRequestProductResponseDto> = {
            ...pagination,
            data: [],
        };

        paginationResponse.data = pagination.data.map((projectexpenserequestproduct: ProjectExpenseRequestProduct) => {
            return plainToClass(ProjectExpenseRequestProductResponseDto, projectexpenserequestproduct, {
                excludeExtraneousValues: true,
            });
        });

        return paginationResponse;
    }
}
