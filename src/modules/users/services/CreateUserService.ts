import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}
@injectable()
export default class CreateUserService {
  private usersRepository: IUsersRepository;

  private cacheProvider: ICacheProvider;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
    @inject('CacheProvider')
    cacheProvider: ICacheProvider,
  ) {
    this.usersRepository = usersRepository;
    this.cacheProvider = cacheProvider;
    this.hashProvider = hashProvider;
  }

  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address alredy used');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('provider-list');

    return user;
  }
}
