import { CreateProjectExpenseRequestDto } from './create-projectexpenserequest.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProjectExpenseRequestDto extends PartialType(CreateProjectExpenseRequestDto) {}
