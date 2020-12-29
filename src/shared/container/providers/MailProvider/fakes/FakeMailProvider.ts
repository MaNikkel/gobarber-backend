import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendMail({ to, subject }: ISendMailDTO): Promise<void> {
    this.messages.push({ to: to.email, body: subject });
  }
}
