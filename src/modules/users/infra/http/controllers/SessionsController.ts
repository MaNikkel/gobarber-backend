import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    // throw new Error('sentry error');
    const { email, password } = req.body;
    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({ email, password });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: p, ...securedUser } = user;
    return res.json({ user: securedUser, token });
  }
}
