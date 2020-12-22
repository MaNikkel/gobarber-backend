import 'reflect-metadata';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover password using email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPassword = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste da Silva',
      password: '123123',
    });

    await sendForgotPassword.execute({
      email: 'teste@teste.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send email to missing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPassword = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPassword.execute({
        email: 'testequenaoexiste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPassword = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );

    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste da Silva',
      password: '123123',
    });

    await sendForgotPassword.execute({
      email: 'teste@teste.com',
    });

    expect(generate).toHaveBeenCalled();
  });
});
