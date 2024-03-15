import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectRepositoryInterface } from '../../domain/interfaces/projectRepository.interface';
import { Project } from '../../domain/entity/project.entity';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { BaseRepository } from '@shared/infrastructure/repository/base.repository';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> implements ProjectRepositoryInterface {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {
        super(projectRepository);
    }

    async create(project: Project): Promise<Project> {
        return this.projectRepository.save(project);
    }

    async findById(id: number): Promise<Project | null> {
        return this.projectRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    async update(id: number, project: Partial<Project>): Promise<Project> {
        await this.projectRepository.update({ id }, project);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.projectRepository.delete(id);
    }

    async pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<Project>> {
        return this.findByCriteria(criteria);
    }
}
