import { ProjectExpenseRequestApproval } from '../entity/projectexpenserequestapproval.entity';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';

export const PROJECTEXPENSEREQUESTAPPROVAL_REPOSITORY_INTERFACE = 'ProjectExpenseRequestApprovalRepositoryInterface';
export interface ProjectExpenseRequestApprovalRepositoryInterface {
    create(projectexpenserequestapproval: ProjectExpenseRequestApproval): Promise<ProjectExpenseRequestApproval>;

    update(id: number, projectexpenserequestapproval: Partial<ProjectExpenseRequestApproval>): Promise<ProjectExpenseRequestApproval>;

    findById(id: number): Promise<ProjectExpenseRequestApproval | null>;

    findAll(): Promise<ProjectExpenseRequestApproval[]>;

    delete(id: number): Promise<void>;
  
    pagination(criteria: SearchCriteriaDto): Promise<PaginateResponseDto<ProjectExpenseRequestApproval>>;

}
