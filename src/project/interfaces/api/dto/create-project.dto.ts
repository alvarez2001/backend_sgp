import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public code: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    public amountApproved: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    public amountAvailable: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    public commissionAmount: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public status: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public currency: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public alias: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    public userId: number;
}
