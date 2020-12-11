import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({ name, email, password });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...securedUser } = user;
      return res.json(securedUser);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
