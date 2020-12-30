import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const showProfile = container.resolve(ShowProfileService);
      const user = await showProfile.execute({ user_id });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...securedUser } = user;
      return res.json(securedUser);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, old_password } = req.body;
      const user_id = req.user.id;
      const updateProfile = container.resolve(UpdateProfileService);
      const user = await updateProfile.execute({
        name,
        email,
        password,
        old_password,
        user_id,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...securedUser } = user;
      return res.json(securedUser);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
