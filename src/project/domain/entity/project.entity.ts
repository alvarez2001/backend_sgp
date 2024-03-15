import { ProjectExpenseRequest } from 'src/projectexpenserequest/domain/entity/projectexpenserequest.entity';
import { User } from 'src/user/domain/entity/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'code', unique: true })
    code: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'amount_approved' })
    amountApproved: number;

    @Column({ name: 'amount_available' })
    amountAvailable: number;

    @Column({ name: 'commission_amount' })
    commissionAmount: number;

    @Column({ name: 'status', comment: 'ON_HOLD | ACTIVE | INACTIVE' })
    status: string;

    @Column({ name: 'currency' })
    currency: string;

    @Column({ name: 'alias' })
    alias: string;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @ManyToOne(() => User, user => user.projects)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => ProjectExpenseRequest, (projectExpenseRequest) => projectExpenseRequest.project)
    projectExpenseRequest: ProjectExpenseRequest[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
