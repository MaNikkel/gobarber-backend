import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  // throw new Error('sentry error');
  const { email, password } = req.body;
  const authenticateUser = container.resolve(AuthenticateUserService);
  const { user, token } = await authenticateUser.execute({ email, password });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: p, ...securedUser } = user;
  return res.json({ user: securedUser, token });
});

export default sessionRouter;
