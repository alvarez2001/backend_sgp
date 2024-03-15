import { CreateProjectExpenseRequestProductDto } from './create-projectexpenserequestproduct.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProjectExpenseRequestProductDto extends PartialType(CreateProjectExpenseRequestProductDto) {}
