import { Project } from 'src/project/domain/entity/project.entity';
import { ProjectExpenseRequest } from 'src/projectexpenserequest/domain/entity/projectexpenserequest.entity';
import { User } from 'src/user/domain/entity/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Column,
} from 'typeorm';

@Entity()
export class ProjectExpenseRequestApproval {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'type', comment: 'REVIEWED | AUTHORIZED | EXECUTED | REFUSED' })
    type: string;

    @Column({ name: 'responsible' })
    responsible: string;

    @Column({ name: 'approval_date' })
    approvalDate: Date;

    @Column({ name: 'project_expense_request_id' })
    expenseRequestId: number;

    @ManyToOne(() => ProjectExpenseRequest, project => project.approvals)
    @JoinColumn({ name: 'project_expense_request_id' })
    expenseRequest: ProjectExpenseRequest;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
