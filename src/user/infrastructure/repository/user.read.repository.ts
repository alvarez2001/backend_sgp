import { Injectable } from '@nestjs/common';
import { UserReadRepositoryInterface } from '../../domain/interfaces/userReadRepository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserRead, UserReadDocument } from '../../domain/entity/user.read';
import { Model } from 'mongoose';
import { CreateUserDto } from '../../interfaces/api/dto/create-user.dto';
import { UpdateUserDto } from '../../interfaces/api/dto/update-user.dto';
import { BaseReadRepository } from '@shared/infrastructure/repository/base.read.repository';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';

@Injectable()
export class UserReadRepository
  extends BaseReadRepository<UserRead>
  implements UserReadRepositoryInterface
{
  constructor(
    @InjectModel(UserRead.name)
    private readonly userReadModel: Model<UserReadDocument>,
  ) {
    super();
  }

  async create(user: CreateUserDto): Promise<UserRead> {
    return this.userReadModel.create(user);
  }

  async findById(id: number): Promise<UserRead | null> {
    return this.userReadModel.findOne({ id }).exec();
  }

  async findAll(): Promise<UserRead[]> {
    return this.userReadModel.find().exec();
  }

  async pagination(
    criteria: SearchCriteriaDto,
  ): Promise<PaginateResponseDto<UserRead>> {
    return this.findByCriteria(this.userReadModel, criteria);
  }

  async update(id: number, user: UpdateUserDto): Promise<UserRead> {
    await this.userReadModel.updateOne({ id }, user).exec();
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userReadModel.deleteOne({ id });
  }
}
