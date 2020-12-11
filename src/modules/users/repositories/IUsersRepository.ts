import User from '../infra/typeorm/entities/User';
import CreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(user: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
