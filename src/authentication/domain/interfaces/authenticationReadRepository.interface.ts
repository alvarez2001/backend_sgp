import { AuthenticationRead } from '../entity/authentication.read';
import { CreateAuthenticationDto } from '../../interfaces/api/dto/create-authentication.dto';
import { UpdateAuthenticationDto } from '../../interfaces/api/dto/update-authentication.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';

export const AUTHENTICATION_READ_REPOSITORY_INTERFACE =
  'AuthenticationReadRepositoryInterface';

export interface AuthenticationReadRepositoryInterface {
  create(authentication: CreateAuthenticationDto): Promise<AuthenticationRead>;

  update(
    id: number,
    authentication: UpdateAuthenticationDto,
  ): Promise<AuthenticationRead>;

  findById(id: number): Promise<AuthenticationRead | null>;

  findAll(): Promise<AuthenticationRead[]>;

  pagination(
    criteria: SearchCriteriaDto,
  ): Promise<PaginateResponseDto<AuthenticationRead>>;

  delete(id: number): Promise<void>;
  findByToken(token: string): Promise<AuthenticationRead>;
}
