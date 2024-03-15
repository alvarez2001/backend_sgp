import { ProjectExpenseRequestProduct } from '../entity/projectexpenserequestproduct.entity';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';

export const PROJECTEXPENSEREQUESTPRODUCT_REPOSITORY_INTERFACE = 'ProjectExpenseRequestProductRepositoryInterface';
export interface ProjectExpenseRequestProductRepositoryInterface {
    create(projectexpenserequestproduct: ProjectExpenseRequestProduct): Promise<ProjectExpenseRequestProduct>;

    update(id: number, projectexpenserequestproduct: Partial<ProjectExpenseRequestProduct>): Promise<ProjectExpenseRequestProduct>;

    findById(id: number): Promise<ProjectExpenseRequestProduct | null>;

    findAll(): Promise<ProjectExpenseRequestProduct[]>;

    delete(id: number): Promise<void>;
  
    pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectExpenseRequestProduct>>;

}
