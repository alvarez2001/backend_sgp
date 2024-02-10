import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public name: string;

    @Column()
    public lastName: string;

    @Column()
    public nationality: string;

    @Column()
    public identification: string;

    @Column()
    public email: string;

    @Column({ unique: true })
    public username: string;

    @Column()
    public password: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}
