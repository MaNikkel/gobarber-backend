// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface RequestDTO {
  email: string;
}
@injectable()
export default class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;

  private userTokensRepository: IUserTokensRepository;

  private mailProvider: IMailProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    userTokensRepository: IUserTokensRepository,
    @inject('MailProvider')
    mailProvider: IMailProvider,
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    this.userTokensRepository = userTokensRepository;
  }

  public async execute({ email }: RequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email address does not exist');
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'glub glub');
  }
}
