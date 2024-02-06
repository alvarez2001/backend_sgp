import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../../../user/interfaces/api/dto/user-response.dto';

export class AuthenticationResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  token: string;

  @ApiProperty()
  @Expose()
  expire_in: string;

  @ApiProperty()
  @Expose()
  userId: number;

  @ApiProperty({ type: UserResponseDto })
  @Type(() => UserResponseDto)
  @Expose()
  user: UserResponseDto;

  @ApiProperty()
  @Type(() => Date)
  @Expose()
  created_at: Date;

  @ApiProperty()
  @Type(() => Date)
  @Expose()
  updated_at: Date;

  constructor(partial: Partial<AuthenticationResponseDto>) {
    Object.assign(this, partial);
  }
}
