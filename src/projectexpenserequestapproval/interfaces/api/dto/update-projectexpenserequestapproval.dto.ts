import { CreateProjectExpenseRequestApprovalDto } from './create-projectexpenserequestapproval.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProjectExpenseRequestApprovalDto extends PartialType(CreateProjectExpenseRequestApprovalDto) {}
