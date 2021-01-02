import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should ce able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe 2',
      email: 'johndoe2@email.com',
      password: '123123',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'John Doe 3',
      email: 'johndoe3@email.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe 4',
      email: 'johndoe4@email.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2, user3]);
  });
});
