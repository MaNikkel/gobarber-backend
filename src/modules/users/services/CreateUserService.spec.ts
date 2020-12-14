import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUsersService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUsersService(fakeUsersRepository);
    const user = await createUser.execute({
      email: 'email@teste.com',
      name: 'Teste TDD',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create duplicate user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUsersService(fakeUsersRepository);
    await createUser.execute({
      email: 'email@teste.com',
      name: 'Teste TDD',
      password: '123123',
    });

    expect(
      createUser.execute({
        email: 'email@teste.com',
        name: 'Teste TDD',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to create 2 appointment in same time', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const createAppointment = new CreateUsersService(fakeUsersRepository);

  //   const date = new Date(2020, 4, 10, 11);

  //   const appointment = await createAppointment.execute({
  //     date,
  //     provider_id: '123456789',
  //   });

  //   expect(appointment).toHaveProperty('id');

  //   expect(
  //     createAppointment.execute({
  //       date,
  //       provider_id: '123456789',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
