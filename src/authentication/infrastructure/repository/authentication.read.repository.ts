import { Injectable } from '@nestjs/common';
import { AuthenticationReadRepositoryInterface } from '../../domain/interfaces/authenticationReadRepository.interface';
import { InjectModel } from '@nestjs/mongoose';
import {
  AuthenticationRead,
  AuthenticationReadDocument,
} from '../../domain/entity/authentication.read';
import { Model } from 'mongoose';
import { CreateAuthenticationDto } from '../../interfaces/api/dto/create-authentication.dto';
import { UpdateAuthenticationDto } from '../../interfaces/api/dto/update-authentication.dto';
import { BaseReadRepository } from '@shared/infrastructure/repository/base.read.repository';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';

@Injectable()
export class AuthenticationReadRepository
  extends BaseReadRepository<AuthenticationRead>
  implements AuthenticationReadRepositoryInterface
{
  constructor(
    @InjectModel(AuthenticationRead.name)
    private readonly authenticationReadModel: Model<AuthenticationReadDocument>,
  ) {
    super();
  }

  async create(
    authentication: CreateAuthenticationDto,
  ): Promise<AuthenticationRead> {
    return this.authenticationReadModel.create(authentication);
  }

  async findById(id: number): Promise<AuthenticationRead | null> {
    return this.authenticationReadModel.findOne({ id }).exec();
  }

  async findAll(): Promise<AuthenticationRead[]> {
    return this.authenticationReadModel.find().exec();
  }

  async pagination(
    criteria: SearchCriteriaDto,
  ): Promise<PaginateResponseDto<AuthenticationRead>> {
    return this.findByCriteria(this.authenticationReadModel, criteria);
  }

  async update(
    id: number,
    authentication: UpdateAuthenticationDto,
  ): Promise<AuthenticationRead> {
    await this.authenticationReadModel.updateOne({ id }, authentication).exec();
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.authenticationReadModel.deleteOne({ id });
  }
}
