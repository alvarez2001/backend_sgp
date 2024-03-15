import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectExpenseRequestApprovalService } from '../../application/projectexpenserequestapproval.service';
import { CreateProjectExpenseRequestApprovalDto } from './dto/create-projectexpenserequestapproval.dto';
import { UpdateProjectExpenseRequestApprovalDto } from './dto/update-projectexpenserequestapproval.dto';
import { ProjectExpenseRequestApprovalResponseDto } from './dto/projectexpenserequestapproval-response.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaginateResponseDto } from '@shared/interfaces/paginate-response.dto';
import { Public } from '@shared/infrastructure/decorators/public.decorator';

@ApiTags('projectexpenserequestapprovals')
@Controller('projectexpenserequestapprovals')
export class ProjectExpenseRequestApprovalController {
    constructor(private readonly projectexpenserequestapprovalService: ProjectExpenseRequestApprovalService) {}

    @Post()
    @Public()
    async create(@Body() createProjectExpenseRequestApprovalDto: CreateProjectExpenseRequestApprovalDto): Promise<ProjectExpenseRequestApprovalResponseDto> {
        return this.projectexpenserequestapprovalService.createProjectExpenseRequestApproval(createProjectExpenseRequestApprovalDto);
    }

    @Get(':id')
    @ApiBearerAuth()
    async findOne(@Param('id') id: number): Promise<ProjectExpenseRequestApprovalResponseDto> {
        return this.projectexpenserequestapprovalService.findProjectExpenseRequestApprovalById(id);
    }

    @Get()
    @ApiBearerAuth()
    async pagination(@Query() query: object): Promise<PaginateResponseDto<ProjectExpenseRequestApprovalResponseDto>> {
        return this.projectexpenserequestapprovalService.pagination(query);
    }

    @Get('/data/list')
    @ApiBearerAuth()
    async findAll(): Promise<ProjectExpenseRequestApprovalResponseDto[]> {
        return this.projectexpenserequestapprovalService.findAllProjectExpenseRequestApprovals();
    }

    @Put(':id')
    @ApiBearerAuth()
    async update(
        @Param('id') id: number,
        @Body() updateProjectExpenseRequestApprovalDto: UpdateProjectExpenseRequestApprovalDto,
    ): Promise<ProjectExpenseRequestApprovalResponseDto> {
        return this.projectexpenserequestapprovalService.updateProjectExpenseRequestApproval(id, updateProjectExpenseRequestApprovalDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    async remove(@Param('id') id: number): Promise<void> {
        return this.projectexpenserequestapprovalService.deleteProjectExpenseRequestApproval(id);
    }
}
