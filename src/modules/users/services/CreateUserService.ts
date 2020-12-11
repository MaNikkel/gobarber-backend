import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address alredy used');
    }
    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return user;
  }
}
