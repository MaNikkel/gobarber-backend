import 'reflect-metadata';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProvidersAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider`s month availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 3, 20, 8, 0, 0),
    });

    // unavailable days
    //  20
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 20, 17, 0, 0),
    });
    //  21
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      date: new Date(2021, 1, 21, 17, 0, 0),
    });

    const availability = await listProvidersAvailability.execute({
      provider_id: 'ididididid',
      year: 2021,
      month: 1,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
        { day: 19, available: true },
      ]),
    );
  });
});
