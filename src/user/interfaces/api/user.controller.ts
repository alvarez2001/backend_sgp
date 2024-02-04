import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '../../application/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserReadService } from '../../application/user.read.service';
import { PaginateResponseDto } from '../../../shared/interfaces/paginate-response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userReadService: UserReadService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserResponseDto> {
    return this.userReadService.findUserById(id);
  }

  @Get()
  async pagination(
    @Query() query: any,
  ): Promise<PaginateResponseDto<UserResponseDto>> {
    return this.userReadService.paginationUsers(query);
  }

  @Get('/data/list')
  async findAll(): Promise<UserResponseDto[]> {
    return this.userReadService.findAllUsers();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
