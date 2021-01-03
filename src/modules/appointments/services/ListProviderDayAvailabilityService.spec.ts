import 'reflect-metadata';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProvidersAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider`s month availability', async () => {
    // unavailable days
    //  20
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      user_id: 'user',
      date: new Date(2021, 1, 20, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'ididididid',
      user_id: 'user',
      date: new Date(2021, 1, 20, 12, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 1, 20, 11).getTime();
    });

    const availability = await listProvidersAvailability.execute({
      provider_id: 'ididididid',
      year: 2021,
      month: 1,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: false },
        { hour: 13, available: false },
        { hour: 14, available: true },
      ]),
    );
  });
});
