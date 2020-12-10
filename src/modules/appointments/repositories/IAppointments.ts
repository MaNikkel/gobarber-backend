import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
