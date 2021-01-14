import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface RequestDTO {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  private usersRepository: IUsersRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('CacheProvider')
    cacheProvider: ICacheProvider,
  ) {
    this.cacheProvider = cacheProvider;
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id }: RequestDTO): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `provider-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(`provider-list:${user_id}`, users);
    }

    return users;
  }
}
