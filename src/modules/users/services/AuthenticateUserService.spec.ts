import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUsersService from './AuthenticateUserService';
import CreateUsersService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('AuthenticateUser', () => {
  it('should be able to authenticate user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUser.execute({
      email: 'email@teste.com',
      name: 'Teste TDD',
      password: '123123',
    });

    const authenticateUser = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const response = await authenticateUser.execute({
      email: 'email@teste.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate missing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'email@teste.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUser.execute({
      email: 'email@teste.com',
      name: 'Teste TDD',
      password: '123123',
    });
    const authenticateUser = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    expect(
      authenticateUser.execute({
        email: 'email@teste.com',
        password: 'senhaerrada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
