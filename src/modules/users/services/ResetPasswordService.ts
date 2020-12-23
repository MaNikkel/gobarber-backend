// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
// import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface RequestDTO {
  password: string;
  token: string;
}
@injectable()
export default class ResetPasswordService {
  private usersRepository: IUsersRepository;

  private userTokensRepository: IUserTokensRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ password, token }: RequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('user not found with token');
    }
    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('user not found with given id');
    }
    user.password = await this.hashProvider.generateHash(password);
    this.usersRepository.save(user);
  }
}
