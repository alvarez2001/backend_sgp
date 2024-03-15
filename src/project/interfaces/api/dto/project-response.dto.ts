import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/user/interfaces/api/dto/user-response.dto';

export class ProjectResponseDto {
    @ApiProperty()
    @Expose()
    public id: number;

    @ApiProperty()
    @Expose()
    public code: string;

    @ApiProperty()
    @Expose()
    public amountApproved: number;

    @ApiProperty()
    @Expose()
    public amountAvailable: number;

    @ApiProperty()
    @Expose()
    public commissionAmount: number;

    @ApiProperty()
    @Expose()
    public status: string;

    @ApiProperty()
    @Expose()
    public currency: string;

    @ApiProperty()
    @Expose()
    public alias: string;

    @ApiProperty()
    @Expose()
    public userId: number;

    @ApiProperty({ type: UserResponseDto })
    @Type(() => UserResponseDto)
    @Expose()
    public user: UserResponseDto;

    @ApiProperty()
    @Type(() => Date)
    @Expose()
    public createdAt: Date;

    @ApiProperty()
    @Type(() => Date)
    @Expose()
    public updatedAt: Date;

    constructor(partial: Partial<ProjectResponseDto>) {
        Object.assign(this, partial);
    }
}
