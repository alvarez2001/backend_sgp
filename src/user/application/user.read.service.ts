import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../interfaces/api/dto/create-user.dto';
import { UpdateUserDto } from '../interfaces/api/dto/update-user.dto';
import { UserResponseDto } from '../interfaces/api/dto/user-response.dto';
import { plainToClass } from 'class-transformer';
import {
  USER_READ_REPOSITORY_INTERFACE,
  UserReadRepositoryInterface,
} from '../domain/interfaces/userReadRepository.interface';
import { PaginateResponseDto } from '../../shared/interfaces/paginate-response.dto';
import { UserRead } from '../domain/entity/user.read';
import { SearchCriteriaDto } from '../../shared/interfaces/search-criteria.dto';

@Injectable()
export class UserReadService {
  constructor(
    @Inject(USER_READ_REPOSITORY_INTERFACE)
    private userRepository: UserReadRepositoryInterface,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.create(createUserDto);
    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const userUpdated = await this.userRepository.update(id, updateUserDto);
    return plainToClass(UserResponseDto, userUpdated, {
      excludeExtraneousValues: true,
    });
  }

  async findUserById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);

    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) =>
      plainToClass(UserResponseDto, user, { excludeExtraneousValues: true }),
    );
  }

  async paginationUsers(
    criteria: SearchCriteriaDto,
  ): Promise<PaginateResponseDto<UserResponseDto>> {
    const pagination: PaginateResponseDto<any> =
      await this.userRepository.pagination(criteria);

    pagination.data = pagination.data.map((user: UserRead) => {
      return plainToClass(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    });

    return pagination;
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
