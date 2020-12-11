import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);
    const user = await createUser.execute({ name, email, password });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...securedUser } = user;
    return res.json(securedUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const usersRepository = new UsersRepository();
    const updateAvatar = new UpdateUserAvatarService(usersRepository);
    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });
    return res.json(user);
  },
);

export default usersRouter;
