import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectExpenseRequestApprovalRepositoryInterface } from '../../domain/interfaces/projectexpenserequestapprovalRepository.interface';
import { ProjectExpenseRequestApproval } from '../../domain/entity/projectexpenserequestapproval.entity';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { BaseRepository } from '@shared/infrastructure/repository/base.repository';

@Injectable()
export class ProjectExpenseRequestApprovalRepository extends BaseRepository<ProjectExpenseRequestApproval> implements ProjectExpenseRequestApprovalRepositoryInterface {
    constructor(
        @InjectRepository(ProjectExpenseRequestApproval)
        private readonly projectexpenserequestapprovalRepository: Repository<ProjectExpenseRequestApproval>,
    ) {
        super(projectexpenserequestapprovalRepository);
    }

    async create(projectexpenserequestapproval: ProjectExpenseRequestApproval): Promise<ProjectExpenseRequestApproval> {
        return this.projectexpenserequestapprovalRepository.save(projectexpenserequestapproval);
    }

    async findById(id: number): Promise<ProjectExpenseRequestApproval | null> {
        return this.projectexpenserequestapprovalRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<ProjectExpenseRequestApproval[]> {
        return this.projectexpenserequestapprovalRepository.find();
    }

    async update(id: number, projectexpenserequestapproval: Partial<ProjectExpenseRequestApproval>): Promise<ProjectExpenseRequestApproval> {
        await this.projectexpenserequestapprovalRepository.update({ id }, projectexpenserequestapproval);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.projectexpenserequestapprovalRepository.delete(id);
    }

    async pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectExpenseRequestApproval>> {
        return this.findByCriteria(criteria);
    }
}
