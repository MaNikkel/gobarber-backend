import 'reflect-metadata';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProvidersAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider`s day appointments', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      user_id: 'user',
      date: new Date(2021, 3, 20, 14, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      user_id: 'user2',
      date: new Date(2021, 3, 20, 15, 0, 0),
    });

    const appointments = await listProvidersAppointments.execute({
      provider_id: 'ididididid',
      year: 2021,
      month: 3,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
