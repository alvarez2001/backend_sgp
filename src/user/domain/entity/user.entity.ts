import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 120 })
  lastName: string;

  @Column({ type: 'char', length: 1 })
  nationality: string;

  @Column({ type: 'varchar', length: 20 })
  identification: string;

  @Column({ type: 'varchar', length: 130 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 190 })
  password: string;

  @Column({ type: 'integer' })
  type: number;

  @Column({ type: 'integer' })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log('Inserting User with id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updating User with id:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removing User with id:', this.id);
  }
}
