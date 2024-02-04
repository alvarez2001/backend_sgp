import { UserRead } from '../entity/user.read';
import { CreateUserDto } from '../../interfaces/api/dto/create-user.dto';
import { UpdateUserDto } from '../../interfaces/api/dto/update-user.dto';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';

export const USER_READ_REPOSITORY_INTERFACE = 'UserReadRepositoryInterface';

export interface UserReadRepositoryInterface {
  create(user: CreateUserDto): Promise<UserRead>;

  update(id: number, user: UpdateUserDto): Promise<UserRead>;

  findById(id: number): Promise<UserRead | null>;

  findAll(): Promise<UserRead[]>;

  pagination(
    criteria: SearchCriteriaDto,
  ): Promise<PaginateResponseDto<UserRead>>;

  delete(id: number): Promise<void>;
}
