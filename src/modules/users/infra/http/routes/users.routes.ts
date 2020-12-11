import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
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
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });
    return res.json(user);
  },
);

export default usersRouter;
