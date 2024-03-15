import { ProjectExpenseRequest } from 'src/projectexpenserequest/domain/entity/projectexpenserequest.entity';
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
export class ProjectExpenseRequestProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'price' })
  price: number;

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
