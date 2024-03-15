import { Project } from '../entity/project.entity';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';

export const PROJECT_REPOSITORY_INTERFACE = 'ProjectRepositoryInterface';
export interface ProjectRepositoryInterface {
    create(project: Project): Promise<Project>;

    update(id: number, project: Partial<Project>): Promise<Project>;

    findById(id: number): Promise<Project | null>;

    findAll(): Promise<Project[]>;

    delete(id: number): Promise<void>;
  
    pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<Project>>;

}
