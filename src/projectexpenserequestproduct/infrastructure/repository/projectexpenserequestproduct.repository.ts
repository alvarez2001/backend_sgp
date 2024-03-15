import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectExpenseRequestProductRepositoryInterface } from '../../domain/interfaces/projectexpenserequestproductRepository.interface';
import { ProjectExpenseRequestProduct } from '../../domain/entity/projectexpenserequestproduct.entity';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { BaseRepository } from '@shared/infrastructure/repository/base.repository';

@Injectable()
export class ProjectExpenseRequestProductRepository extends BaseRepository<ProjectExpenseRequestProduct> implements ProjectExpenseRequestProductRepositoryInterface {
    constructor(
        @InjectRepository(ProjectExpenseRequestProduct)
        private readonly projectexpenserequestproductRepository: Repository<ProjectExpenseRequestProduct>,
    ) {
        super(projectexpenserequestproductRepository);
    }

    async create(projectexpenserequestproduct: ProjectExpenseRequestProduct): Promise<ProjectExpenseRequestProduct> {
        return this.projectexpenserequestproductRepository.save(projectexpenserequestproduct);
    }

    async findById(id: number): Promise<ProjectExpenseRequestProduct | null> {
        return this.projectexpenserequestproductRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<ProjectExpenseRequestProduct[]> {
        return this.projectexpenserequestproductRepository.find();
    }

    async update(id: number, projectexpenserequestproduct: Partial<ProjectExpenseRequestProduct>): Promise<ProjectExpenseRequestProduct> {
        await this.projectexpenserequestproductRepository.update({ id }, projectexpenserequestproduct);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.projectexpenserequestproductRepository.delete(id);
    }

    async pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectExpenseRequestProduct>> {
        return this.findByCriteria(criteria);
    }
}
