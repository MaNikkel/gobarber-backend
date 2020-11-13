import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  // throw new Error('sentry error');
  const { email, password } = req.body;
  const authenticateUser = new AuthenticateUserService();
  const { user, token } = await authenticateUser.execute({ email, password });
  const { password: _, ...securedUser } = user;
  return res.json({ user: securedUser, token });
});

export default sessionRouter;
