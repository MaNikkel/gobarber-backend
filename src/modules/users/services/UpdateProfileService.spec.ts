import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      email: 'johndow2@emnail.com',
      name: 'John Doe Doe',
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('John Doe Doe');
    expect(updatedUser.email).toBe('johndow2@emnail.com');
  });

  it('should not be able to update email to an alredy taken email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe 2',
      email: 'johndow2@emnail.com',
      password: '135798534',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        email: 'johndow2@emnail.com',
        name: 'John Doe Doe',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      email: 'johndow2@emnail.com',
      name: 'John Doe Doe',
      user_id: user.id,
      password: '123456',
      old_password: '123123',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able to update the password due to missing old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        email: 'johndow2@emnail.com',
        name: 'John Doe Doe',
        user_id: user.id,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password due to wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        email: 'johndow2@emnail.com',
        name: 'John Doe Doe',
        user_id: user.id,
        password: '123456',
        old_password: 'asdfasdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
