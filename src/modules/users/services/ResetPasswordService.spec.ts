import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('ResetPasswordService', () => {
  it('should be able to reset the password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const fakeHashProvider = new FakeHashProvider();
    const sendForgotPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste da Silva',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const userReset = await fakeUsersRepository.findById(user.id);

    await sendForgotPassword.execute({
      password: '123123',
      token,
    });

    expect(userReset?.password).toBe('123123');
  });

  it('should be able to hash the password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const fakeHashProvider = new FakeHashProvider();
    const sendForgotPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste da Silva',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await sendForgotPassword.execute({
      password: '123123',
      token,
    });

    expect(generateHash).toBeCalled();
  });
});
