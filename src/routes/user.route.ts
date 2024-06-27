import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.patch('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

const userRouter = router;
export default userRouter;
