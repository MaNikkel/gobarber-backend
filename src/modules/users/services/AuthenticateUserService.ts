import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return { user, token };
  }
}
