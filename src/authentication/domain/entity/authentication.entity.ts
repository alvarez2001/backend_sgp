import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entity/user.entity';

@Entity()
export class Authentication {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public token: string;

    @Column()
    public expire_in: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}
