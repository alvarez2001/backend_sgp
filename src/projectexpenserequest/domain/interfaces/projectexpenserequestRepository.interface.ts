import { ProjectExpenseRequest } from '../entity/projectexpenserequest.entity';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';

export const PROJECTEXPENSEREQUEST_REPOSITORY_INTERFACE = 'ProjectExpenseRequestRepositoryInterface';
export interface ProjectExpenseRequestRepositoryInterface {
    create(projectexpenserequest: ProjectExpenseRequest): Promise<ProjectExpenseRequest>;

    update(id: number, projectexpenserequest: Partial<ProjectExpenseRequest>): Promise<ProjectExpenseRequest>;

    findById(id: number): Promise<ProjectExpenseRequest | null>;

    findAll(): Promise<ProjectExpenseRequest[]>;

    delete(id: number): Promise<void>;
  
    pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectExpenseRequest>>;

}
