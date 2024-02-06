import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from '../interfaces/api/dto/create-authentication.dto';
import { UpdateAuthenticationDto } from '../interfaces/api/dto/update-authentication.dto';
import { AuthenticationResponseDto } from '../interfaces/api/dto/authentication-response.dto';
import { plainToClass } from 'class-transformer';
import {
  AUTHENTICATION_READ_REPOSITORY_INTERFACE,
  AuthenticationReadRepositoryInterface,
} from '../domain/interfaces/authenticationReadRepository.interface';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { AuthenticationRead } from '../domain/entity/authentication.read';
import { SearchCriteriaDto } from '@shared/interfaces/search-criteria.dto';

@Injectable()
export class AuthenticationReadService {
  constructor(
    @Inject(AUTHENTICATION_READ_REPOSITORY_INTERFACE)
    private authenticationRepository: AuthenticationReadRepositoryInterface,
  ) {}

  async createAuthentication(
    createAuthenticationDto: CreateAuthenticationDto,
  ): Promise<AuthenticationResponseDto> {
    const authentication = await this.authenticationRepository.create(
      createAuthenticationDto,
    );
    return plainToClass(AuthenticationResponseDto, authentication, {
      excludeExtraneousValues: true,
    });
  }

  async updateAuthentication(
    id: number,
    updateAuthenticationDto: UpdateAuthenticationDto,
  ): Promise<AuthenticationResponseDto> {
    const authentication = await this.authenticationRepository.findById(id);
    if (!authentication) {
      throw new Error('Authentication not found');
    }

    const authenticationUpdated = await this.authenticationRepository.update(
      id,
      updateAuthenticationDto,
    );
    return plainToClass(AuthenticationResponseDto, authenticationUpdated, {
      excludeExtraneousValues: true,
    });
  }

  async findAuthenticationById(id: number): Promise<AuthenticationResponseDto> {
    const authentication = await this.authenticationRepository.findById(id);

    return plainToClass(AuthenticationResponseDto, authentication, {
      excludeExtraneousValues: true,
    });
  }

  async findAllAuthentications(): Promise<AuthenticationResponseDto[]> {
    const authentications = await this.authenticationRepository.findAll();
    return authentications.map((authentication) =>
      plainToClass(AuthenticationResponseDto, authentication, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async paginationAuthentications(
    criteria: SearchCriteriaDto,
  ): Promise<PaginateResponseDto<AuthenticationResponseDto>> {
    const pagination: PaginateResponseDto<any> =
      await this.authenticationRepository.pagination(criteria);

    pagination.data = pagination.data.map(
      (authentication: AuthenticationRead) => {
        return plainToClass(AuthenticationResponseDto, authentication, {
          excludeExtraneousValues: true,
        });
      },
    );

    return pagination;
  }

  async deleteAuthentication(id: number): Promise<void> {
    return this.authenticationRepository.delete(id);
  }

  async verifyExistToken(token: string): Promise<AuthenticationResponseDto> {
    const existToken = await this.authenticationRepository.findByToken(token);
    return plainToClass(AuthenticationResponseDto, existToken, {
      excludeExtraneousValues: true,
    });
  }
}
