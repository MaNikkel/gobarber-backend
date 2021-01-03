import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 1, 2, 10).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 1, 16, 10),
      provider_id: '123456789',
      user_id: '999',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create 2 appointment in same time', async () => {
    const date = new Date(2021, 1, 4, 11);

    const appointment = await createAppointment.execute({
      date,
      provider_id: '123456789',
      user_id: '999',
    });

    expect(appointment).toHaveProperty('id');

    await expect(
      createAppointment.execute({
        date,
        provider_id: '123456789',
        user_id: '999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment in past', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 1, 1, 10).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 1, 1, 9),
        provider_id: '123456789',
        user_id: '999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 10, 15),
        provider_id: '123456789',
        user_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment not between 8h and 17h', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 10, 7),
        provider_id: '123456789',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 10, 18),
        provider_id: '123456789',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
