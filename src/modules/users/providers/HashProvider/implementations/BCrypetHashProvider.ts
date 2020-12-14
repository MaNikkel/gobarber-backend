import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashedPayload = hash(payload, 8);
    return hashedPayload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const result = compare(payload, hashed);
    return result;
  }
}
