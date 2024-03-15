import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectExpenseRequestRepositoryInterface } from '../../domain/interfaces/projectexpenserequestRepository.interface';
import { ProjectExpenseRequest } from '../../domain/entity/projectexpenserequest.entity';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { BaseRepository } from '@shared/infrastructure/repository/base.repository';

@Injectable()
export class ProjectExpenseRequestRepository extends BaseRepository<ProjectExpenseRequest> implements ProjectExpenseRequestRepositoryInterface {
    constructor(
        @InjectRepository(ProjectExpenseRequest)
        private readonly projectexpenserequestRepository: Repository<ProjectExpenseRequest>,
    ) {
        super(projectexpenserequestRepository);
    }

    async create(projectexpenserequest: ProjectExpenseRequest): Promise<ProjectExpenseRequest> {
        return this.projectexpenserequestRepository.save(projectexpenserequest);
    }

    async findById(id: number): Promise<ProjectExpenseRequest | null> {
        return this.projectexpenserequestRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<ProjectExpenseRequest[]> {
        return this.projectexpenserequestRepository.find();
    }

    async update(id: number, projectexpenserequest: Partial<ProjectExpenseRequest>): Promise<ProjectExpenseRequest> {
        await this.projectexpenserequestRepository.update({ id }, projectexpenserequest);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.projectexpenserequestRepository.delete(id);
    }

    async pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectExpenseRequest>> {
        return this.findByCriteria(criteria);
    }
}
