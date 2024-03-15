import { Project } from 'src/project/domain/entity/project.entity';
import { ProjectExpenseRequestApproval } from 'src/projectexpenserequestapproval/domain/entity/projectexpenserequestapproval.entity';
import { User } from 'src/user/domain/entity/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Column,
    OneToMany,
} from 'typeorm';

@Entity()
export class ProjectExpenseRequest {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'responsible' })
    responsible: string;

    @Column({ name: 'status', comment: '' })
    status: string;

    @Column({ name: 'concept' })
    concept: string;

    @Column({ name: 'voucher' })
    voucher: string;

    @Column({ name: 'total' })
    total: number;

    @Column({ name: 'exchange_rate' })
    exchangeRate: number;

    @Column({ name: 'currency_producer' })
    currencyProducer: string;

    @Column({ name: 'project_id' })
    projectId: number;

    @ManyToOne(() => Project, project => project.projectExpenseRequest)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => User, user => user.projectExpenseRequest)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(
        () => ProjectExpenseRequestApproval,
        projectExpenseRequestApproval => projectExpenseRequestApproval.expenseRequest,
    )
    approvals: ProjectExpenseRequestApproval[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
