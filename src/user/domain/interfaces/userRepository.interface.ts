import { User } from '../entity/user.entity';

export const USER_REPOSITORY_INTERFACE = 'UserRepositoryInterface';
export interface UserRepositoryInterface {
  create(user: User): Promise<User>;

  update(id: number, user: Partial<User>): Promise<User>;

  findById(id: number): Promise<User | null>;

  findAll(): Promise<User[]>;

  delete(id: number): Promise<void>;
}
